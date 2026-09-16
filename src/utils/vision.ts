import '@tensorflow/tfjs';
import { PromptId } from '../games/MoonPhotoHunt';

let mobilenetModel: typeof import('@tensorflow-models/mobilenet') | null = null;
let model: import('@tensorflow-models/mobilenet').MobileNet | null = null;

export const loadModel = async () => {
  if (!mobilenetModel) {
    mobilenetModel = await import('@tensorflow-models/mobilenet');
  }
  if (!model) {
    model = await mobilenetModel.load();
  }
  return model;
};

export const verifyImage = async (imageElement: HTMLImageElement, promptId: PromptId): Promise<boolean> => {
  const net = await loadModel();
  
  // MobileNet classifies the entire image and returns the top 3 guesses
  const predictions = await net.classify(imageElement, 3);
  
  // Keyword Mapping to map MobileNet's 1000 classes to our custom 2 targets
  const keywords: Record<PromptId, string[]> = {
    rabbit: ['hare', 'wood rabbit', 'Angora', 'rabbit'],
    mooncake: ['potpie', 'bakery', 'bagel', 'dough', 'French loaf', 'meat loaf', 'puck', 'pretzel', 'bun', 'bread']
  };

  const targetWords = keywords[promptId];
  
  // Check if any of the AI's top 3 guesses contain one of our target words
  const isMatch = predictions.some(pred => {
    return targetWords.some(word => pred.className.toLowerCase().includes(word.toLowerCase()));
  });
  
  return isMatch;
};
