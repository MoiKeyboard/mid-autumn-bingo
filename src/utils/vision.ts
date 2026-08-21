import '@tensorflow/tfjs';
import { PromptId } from '../games/MoonPhotoHunt';

// Dynamically import coco-ssd to prevent bloating main bundle
let cocoSsd: typeof import('@tensorflow-models/coco-ssd') | null = null;
let model: import('@tensorflow-models/coco-ssd').ObjectDetection | null = null;

export const loadModel = async () => {
  if (!cocoSsd) {
    // Fetch the COCO-SSD module on demand
    cocoSsd = await import('@tensorflow-models/coco-ssd');
  }
  
  if (!model) {
    // Load the actual neural network weights (defaults to lite_mobilenet_v2)
    model = await cocoSsd.load();
  }
  return model;
};

export const verifyImage = async (imageElement: HTMLImageElement, promptId: PromptId): Promise<boolean> => {
  const net = await loadModel();
  
  // COCO-SSD handles all the tensor conversion and resizing internally!
  // It actively scans the image for 80 different common objects and returns bounding boxes.
  const predictions = await net.detect(imageElement);
  
  // Festival-friendly keyword mapping for COCO-SSD's 80 classes
  const keywords: Record<PromptId, string[]> = {
    round: ['apple', 'orange', 'sports ball', 'bowl', 'cup', 'clock', 'donut', 'pizza', 'cake', 'vase'],
    companion: ['person', 'cat', 'dog', 'bird', 'horse', 'sheep', 'cow'],
    lantern: ['tv', 'laptop', 'cell phone', 'microwave', 'oven'],
    flora: ['potted plant', 'broccoli', 'carrot', 'apple', 'banana', 'orange'],
    feast: ['pizza', 'hot dog', 'cake', 'donut', 'sandwich', 'apple', 'banana', 'orange', 'carrot', 'broccoli'],
    utensil: ['cup', 'wine glass', 'bottle', 'fork', 'knife', 'spoon', 'bowl'],
    transport: ['car', 'bicycle', 'motorcycle', 'bus', 'train', 'truck', 'boat', 'airplane'],
    comfort: ['chair', 'couch', 'bed', 'bench'],
    knowledge: ['book', 'laptop', 'cell phone', 'tv'],
    accessory: ['umbrella', 'backpack', 'handbag', 'tie', 'suitcase']
  };

  const targetWords = keywords[promptId];
  
  // STRICT MATCHING: The model MUST confidently detect one of our target words.
  // There is no longer a generic 'pass if > 80% confident' bug.
  const isMatch = predictions.some(pred => {
    return targetWords.includes(pred.class) && pred.score > 0.5;
  });
  
  return isMatch;
};
