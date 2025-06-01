export const mappingEmotion = {
  기쁨: '😄',
  슬픔: '😭',
  화남: '😡',
  지침: '😵',
  신남: '🥳',
  보통: '😐',
};

export const getEmotionData = (emotion) => {
  const matchTextWithEmoji = mappingEmotion[emotion];

  return matchTextWithEmoji ?? '😐';
};
