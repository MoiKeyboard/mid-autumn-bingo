// Dynamically import tfjs to prevent it from bloating the main bundle
let tf: typeof import('@tensorflow/tfjs') | null = null;
let model: any = null; // using any since tf.GraphModel isn't available until import
let labels: string[] = [];

// Modern MobileNet V3 Small directly from TF Hub
const MODEL_URL = 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1';
const LABELS_URL = 'https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt';

export const loadModel = async () => {
  if (!tf) {
    // Dynamically fetch the massive TFJS library ONLY when a user opens the Photo Hunt
    tf = await import('@tensorflow/tfjs');
    await tf.ready();
  }
  
  if (!model) {
    model = await tf.loadGraphModel(MODEL_URL, { fromTFHub: true });
    
    // Fetch the 1000 ImageNet labels
    const response = await fetch(LABELS_URL);
    const text = await response.text();
    labels = text.split('\n').map(l => l.trim().toLowerCase());
  }
  return { tf, model };
};

export const verifyImage = async (imageElement: HTMLImageElement, promptId: 'round' | 'jade' | 'shadow'): Promise<boolean> => {
  const { tf, model: net } = await loadModel();
  
  // Preprocess the image for MobileNet V3
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims(0)
    .div(255.0); // Normalize to 0-1

  const predictions = net.predict(tensor) as tf.Tensor;
  const values = await predictions.data();
  
  // Cleanup tensors to prevent memory leaks
  tensor.dispose();
  predictions.dispose();

  // Find the top 3 predictions
  const topIndices = Array.from(values)
    .map((prob, index) => ({ prob, index }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 3);
    
  const text = topIndices.map(p => labels[p.index]).join(' ');

  // Festival-friendly keyword mapping
  const keywords = {
    round: ['ball', 'orange', 'apple', 'fruit', 'lemon', 'bowl', 'plate', 'wheel', 'balloon', 'clock', 'pomegranate', 'sphere'],
    jade: ['green', 'plant', 'leaf', 'tree', 'grass', 'cucumber', 'zucchini', 'broccoli', 'fern'],
    shadow: ['silhouette', 'night', 'dark', 'shade', 'black', 'background'] 
  };

  const targetWords = keywords[promptId];
  const isMatch = targetWords.some(word => text.includes(word));
  
  // If we match a keyword, or if the top prediction is very confident (fallback)
  if (isMatch || topIndices[0].prob > 0.8) {
      return true;
  }
  
  return false;
};
