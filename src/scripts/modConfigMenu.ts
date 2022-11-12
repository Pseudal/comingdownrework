export function ModConfig(IRFconfig) {
  if (ModConfigMenu !== undefined) {
    ModConfigMenu.RemoveCategory("Coming Down!");

    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!","About",() => "Coming Down ![Rework]",);
    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!", "About", () => `Version 2.2`);

    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!", "About", () => "Remake made by Tidloas with love");
    ModConfigMenu.AddSpace("Coming Down!", "About");

    ModConfigMenu.AddSetting("Coming Down!", `Vanilla`, {
      Type: ModConfigMenuOptionType.BOOLEAN,
      CurrentSetting() {
        return IRFconfig.FatSack;
      },
      Display() {
        let onOff = "Disabled";
        if (IRFconfig.FatSack == true) {
          onOff = "Enabled";
        }
        return `FatSack: ${onOff}`;
      },
      OnChange(IsOn) {
        IRFconfig.FatSack = IsOn as boolean;
      },
      Info: [`disables the indicator for FatSack and his variants`],
    });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("Coming Down!", `${type}`, {
        Type: ModConfigMenuOptionType.BOOLEAN,
        CurrentSetting() {
          return IRFconfig[entity];
        },
        Display() {
          let onOff = "Disabled";
          if (IRFconfig[entity] == true) {
            onOff = "Enabled";
          }
          return `${name}: ${onOff}`;
        },
        OnChange(IsOn) {
          if(entity == "AllProjectile" && (IsOn == 1 || true)){
            IRFconfig["RockFall"] = false
          }
          if(entity == "RockFall" && (IsOn == 1 || true)){
            IRFconfig["AllProjectile"] = false
          }
          if(entity == "Daddy" && (IsOn == 0 || false)){
            IRFconfig["DadAlt"] = false
          }
          IRFconfig[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("Leaper", "Vanilla", "Leaper", "Enables the indicator for Leaper and his variants.");
    addItem("Monstro", "Vanilla", "Monstro", "Enables the indicator for Monstro, Monstro II, Gish and their variants.");
    addItem("Mom", "Vanilla", "Mom's Stomp", "Enables the indicator for Mom and her variants");
    addItem("Peep", "Vanilla", "Peep", "Enables the indicator for Peep and his variants.");
    addItem("blastocyst", "Vanilla", "Blastocyst", "Enables the indicator for Blastocyst and his variants.");
    addItem("Daddy", "Vanilla", "Daddy", "Enables the indicator for Daddy, Triachnide and their variants.");
    addItem("MomHand", "Vanilla", "Mom's hand", "Enables the indicator for Mom's hand and her variants.");
    addItem("MegaFatty", "Vanilla", "Mega Fatty", "Enables the indicator for Mega fatty(2), sister's vis and their variants.");
    addItem("ALeach", "Vanilla", "Adult Leach", "Enables the indicator for Adult leach and his variants.");
    addItem("Beelzeblub", "Vanilla", "Beelzeblub", "Enables the indicator for Beelzeblub and his variants.");
    addItem("Singe", "Vanilla", "Singe", "Enables the indicator for Singe and his variants.");
    addItem("Adversary", "Vanilla", "The Adversary", "Enables the indicator for The Adversary and his variants.");
    addItem("Delirium", "Vanilla", "Delirium", "Takes into account ALL Delirium transformations. Unpredictable effect with any delirium modifying mod. May be inaccurate.");
    addItem("MegaSatan", "Vanilla", "MegaSatan", "Enables the indicator for MegaSatan hands.");
    addItem("UltraGreed", "Vanilla", "Ultra Greed", "Enables the indicator for Ultra greedier.");
    addItem("Mother", "Vanilla", "Mother", "Enable the Enables for Mother(not rly useful).");
    addItem("RockFall", "Projectiles", "RockFall", "Enables the indicator on falling rocks, with Bumbino for example (this option impacts all these projectiles).");
    addItem("GreedCoin", "Projectiles", "GreedBigCoin", "Enables the indicator for Greedier big coin.");
    addItem("AllProjectile", "Projectiles", "All Falling Projectiles", "Experimental option, activates the indicator on all projectiles falling on Isaac. Possible bug and incompatibility.");
//    if(Fiend ){
      ModConfigMenu.AddText("Coming Down!", "FF & Rev", () => "Fiend Folio");
      addItem("Slammer", "FF & Rev", "Slammer", "Enables the indicator for Slammer and his variants.");
      addItem("Poobottle", "FF & Rev", "Poobottle", "Enables the indicator for Poobottle, Dragonfly and their variants.");
      addItem("Diplet", "FF & Rev", "Diplet", "Enables the indicator for Diplet and his variants.");
      addItem("Battie", "FF & Rev", "Battie", "Enables the indicator for Battie and his variants.");
      addItem("Monsoon", "FF & Rev", "Monsoon", "Enables the indicator for Monsoon and his variants.");
      addItem("Peeping", "FF & Rev", "Peeping", "Enables the indicator for Peeping and his variants.");
      addItem("Tsar", "FF & Rev", "Tsar", "Enables the indicator for Tsar and his variants.");
      addItem("Dusk", "FF & Rev", "Dusk", "Enables the indicator for Dusk and his variants.");
      ModConfigMenu.AddText("Coming Down!", "FF & Rev", () => "Revelation");
      addItem("FatSnow", "FF & Rev", "FatSnow", "Enables the indicator for FatSnow and his variants.");
      addItem("Chuck", "FF & Rev", "Chuck", "Enables the indicator for Chuck and his variants.");
      addItem("Glasstro", "FF & Rev", "Glasstro", "Enables the indicator for Glasstro and his variants.");
      addItem("Aragnid", "FF & Rev", "Aragnid", "Enables the indicator for Aragnid and his variants.");
      addItem("Catastroph", "FF & Rev", "Cricket", "Enables the indicator for Cricket and his variants.");
//    }

//    if(SWAMP ){
      ModConfigMenu.AddText("Coming Down!", "Other", () => "Splashy and Roghorn: ");
      addItem("Splashy", "Other", "Splashy", "Enables the indicator for Splashy and her variants.");
      addItem("RogHorn", "Other", "RogHorn", "Enables the indicator for RogHorn and his variants(not rly useful).");
//    }
    addItem("DadAlt", "Special", "Daddy alt", "Alternative animation for daddy, I don't really like it, but can be more practical..");

    ModConfigMenu.AddSpace("Coming Down!", "ChangeLog");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "+ Optimisation ");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "+ Fix alt mom");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "+ more slammer from fiend folio");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "- debug");

    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "PixelPlz for his advice and help");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "Querty for his contribution on the Revamp");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "Made with the IsaacScript framework");


  }
}
