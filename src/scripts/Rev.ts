export function RevCompatibility(
  ent,
  EntSprite,
  spawnDanger,
  data,
  remove,
  IRFconfig,
): void {
  //FatSnow
  if (
    ent.Type == 484 &&
    ent.Variant == 541 &&
    EntSprite.IsPlaying("Attack") &&
    IRFconfig.FatSnow
  ) {
    if (EntSprite.IsEventTriggered("Jump")) {
      spawnDanger(ent);
      return;
    }
    if (EntSprite.IsPlaying("Attack")) {
      if (EntSprite.IsEventTriggered("Creep")) {
        remove(data);
        return;
      }
    }
    //Chuck
  } else if (
    ent.Type == 770 &&
    ent.Variant == 1010 &&
    EntSprite.IsPlaying("Throw High") &&
    IRFconfig.Chuck
  ) {
    spawnDanger(ent);
    return;
  } //Glasstro
  else if (
    ent.Type == 1000 &&
    ent.Variant == 3480 &&
    EntSprite.IsPlaying("JumpDown") &&
    IRFconfig.Glasstro
  ) {
    if (EntSprite.GetFrame() == 1) {
      spawnDanger(ent);
      return;
    }
    if (EntSprite.GetFrame() == 32) {
      remove(data);
      return;
    }
  } //aragnid
  else if (
    ent.Type == 790 &&
    ent.Variant == 2678 &&
    (EntSprite.IsPlaying("BigJump") || EntSprite.IsPlaying("BigJumpNoMove")) &&
    IRFconfig.Aragnid
  ) {
    if (ent.HitPoints < (66 / 100) * ent.MaxHitPoints) {
      if (EntSprite.IsEventTriggered("Jump")) {
        spawnDanger(ent);
        return;
      }
    }
  } //Catastroph (cricket)
  else if (
    ent.Type == 505 &&
    ent.Variant == 2682 &&
    (EntSprite.IsPlaying("FlyUp") || EntSprite.IsPlaying("FlyDown")) &&
    IRFconfig.Catastroph
  ) {
    if (EntSprite.IsEventTriggered("Flystart")) {
      spawnDanger(ent, 0.03);
      return;
    }
    if (EntSprite.IsEventTriggered("Shockwave")) {
      remove(data);
      return;
    }
  }
}
