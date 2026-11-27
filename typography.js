// Apply to copy before interpolation, leaving markup and URLs untouched.
function joinRussianShortWords(text) {
  return text.replace(
    /(^|[\t \u00a0«„“"([—–])((?:(?:а|в|во|и|к|ко|о|об|обо|с|со|у|я|но|да|не|или|либо|без|близ|вне|для|до|за|из|из-за|из-под|меж|между|на|над|от|перед|по|под|при|про|через|вдоль|взамен|вместо|вокруг|возле|вслед|внутри|мимо|около|после|против|ради|среди|сквозь|кроме|свыше) +)+)(?=[«„“"([]?[\p{L}\p{N}])/giu,
    (_, boundary, words) => boundary + words.replace(/ +/g, '\u00a0')
  );
}
