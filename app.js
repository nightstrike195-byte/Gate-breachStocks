/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) EDIT PANEL PASSWORD LOCK (CHANGE THIS PASSWORD)
   *****************************************************************/
  const EDIT_PANEL_PASSWORD = "Raijin is a bitch"; // <- change this to whatever you want
  const EDIT_AUTH_KEY = "gb_edit_authed_v1";

  function isEditAuthed(){
    try{ return sessionStorage.getItem(EDIT_AUTH_KEY) === "1"; }catch{ return false; }
  }
  function setEditAuthed(v){
    try{ sessionStorage.setItem(EDIT_AUTH_KEY, v ? "1" : "0"); }catch{}
  }
  function requireEditAuth(){
    if(isEditAuthed()) return true;

    const entered = prompt("Enter password to access the Edit panel:");
    if(entered === null) return false;

    if(String(entered) === String(EDIT_PANEL_PASSWORD)){
      setEditAuthed(true);
      setEditPanelEnabled(true);
      return true;
    }

    alert("Wrong password.");
    setEditPanelEnabled(false);
    return false;
  }
  function setEditPanelEnabled(enabled){
    const panel = document.querySelector("#editPanel");
    if(!panel) return;
    const nodes = panel.querySelectorAll("input, textarea, select, button");
    nodes.forEach(n => {
      // allow nav buttons to still work if they are inside edit panel (usually not)
      if(n && n.id && /^closeModalBtn$/i.test(n.id)) return;
      n.disabled = !enabled;
    });
    panel.style.pointerEvents = enabled ? "" : "none";
    panel.style.filter = enabled ? "" : "grayscale(1)";
    panel.style.opacity = enabled ? "" : "0.75";
  }

  /*****************************************************************
   * 1) PASTE YOUR entityMedia HERE (TOP LEVEL, NOT INSIDE ANYTHING)
   *****************************************************************/
  const entityMedia = {
    "kaien_dazhen": { image: "https://media.discordapp.net/attachments/708562883075637278/1453717432761057424/image.png?ex=694e775c&is=694d25dc&hm=345aa7ce62acb6763cbce1d4462a9546fda04cd8714fc7a2daa9616408ba3f8d&=&format=webp&quality=lossless&width=492&height=359", link: "https://example.com/kaien" },
    "raijin_kurozawa": { image: "https://media.discordapp.net/attachments/708562883075637278/1453719884616699945/image.png?ex=694e79a5&is=694d2825&hm=f6da8bcdecb9e59a1b6305d6b1c117075223d0bba9cf0612eb301080f601c448&=&format=webp&quality=lossless&width=559&height=493", link: "https://example.com/raijin" },

    "lara_kurozawa": { image: "https://i.imgur.com/XXXXX.png", link: "https://example.com/lara" },
    "yankovich_dazhen": { image: "https://media.discordapp.net/attachments/708562883075637278/1453720162896183448/image.png?ex=694e79e7&is=694d2867&hm=be52213d1360128cf5fb0c53528cffa698f33d1d87c847fcc223011934b00902&=&format=webp&quality=lossless&width=424&height=575", link: "https://example.com/yankovich" },

    "kopa": { image: "https://media.discordapp.net/attachments/1453620678551933072/1453620897154994252/20251028_1018482.jpg?ex=694e1d74&is=694ccbf4&hm=d1a7c3778a23b7883e618797a27c5c23db7553673a438fb31cde43b1137531fa&=&format=webp&width=559&height=946", link: "https://example.com/kopa" },
    "old_man": { image: "https://media.discordapp.net/attachments/1453606418606325886/1453606837646528695/20250707_1051202.jpg?ex=694e105c&is=694cbedc&hm=db1474a144dcc806f6a33d47cda0787185d708803bc0a11b15042b13e414295f&=&format=webp&width=820&height=946", link: "https://example.com/old_man" },

    "leo": { image: "https://media.discordapp.net/attachments/708562883075637278/1453720828393947258/image.png?ex=694e7a86&is=694d2906&hm=c8d9862a54467d2679983347244523ffc260ad259d72754b8005db1aa59df515&=&format=webp&quality=lossless&width=449&height=637", link: "https://example.com/leo" },
    "virgo": { image: "https://media.discordapp.net/attachments/708562883075637278/1453870691169468598/image.png?ex=694f0618&is=694db498&hm=e8974ff9d5ebdb9e05f240cb19396d78ef2d02576e86e9166525638a16558c6f&=&format=webp&quality=lossless&width=397&height=344", link: "https://example.com/virgo" },
    "pisces": { image: "https://media.discordapp.net/attachments/708562883075637278/1453721380725063801/image.png?ex=694e7b0a&is=694d298a&hm=c1697299e9611b6b0c752bd3049989c2942bf7fdeb98dfb77504f6b4d031d5ae&=&format=webp&quality=lossless&width=390&height=500", link: "https://example.com/pisces" },
    "capricorn": { image: "https://media.discordapp.net/attachments/708562883075637278/1453870566523011115/image.png?ex=694f05fa&is=694db47a&hm=f810267e38868d12183af37796aed01fb9641353e4e348144e13809fbac193ed&=&format=webp&quality=lossless&width=365&height=487", link: "https://example.com/capricorn" },
    "scorpio": { image: "https://media.discordapp.net/attachments/708562883075637278/1453721265637560468/image.png?ex=694e7aee&is=694d296e&hm=42dcad788664b17ca081b5bdd20744abf34973e500dc00d58826098235a1d00b&=&format=webp&quality=lossless&width=278&height=325", link: "https://example.com/scorpio" },

    "white_ranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453721544604782733/image.png?ex=694e7b31&is=694d29b1&hm=d27e326b7eb50f54cb100813f249b991a77f2d0ef191aaabb74cd8a517031f83&=&format=webp&quality=lossless&width=395&height=602", link: "https://example.com/white_ranger" },
    "pink_neo_ranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453721642139123753/image.png?ex=694e7b48&is=694d29c8&hm=201b733e5d8d911c9b7969e2a13d4a339d720d5f86c419a6511438e0a88a9a34&=&format=webp&quality=lossless&width=415&height=529", link: "https://example.com/pink_neo_ranger" },
    "gold_neo_ranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453721747974000651/image.png?ex=694e7b61&is=694d29e1&hm=3d1645c58613e0288fe975ac72c22838869511fe7120919d9fa310fefec682da&=&format=webp&quality=lossless&width=487&height=479", link: "https://example.com/gold_neo_ranger" },
    "kyro_okabe": { image: "https://media.discordapp.net/attachments/708562883075637278/1453870936045518999/image.png?ex=694f0652&is=694db4d2&hm=beab3f2138f78b89feece1227df78e2a1bb7d731bbc12842c438474b3aa43785&=&format=webp&quality=lossless&width=311&height=308", link: "https://example.com/kyro_okabe" },
    "vt_082": { image: "https://media.discordapp.net/attachments/1453625335122886768/1453625431965171773/Screenshot_2025-12-01_093042.png?ex=694eca6e&is=694d78ee&hm=8e73d4453107548b03ca11d9360a97eb81ee94e1a41ebd8f51aea49981de42be&=&format=webp&quality=lossless&width=1266&height=893", link: "https://example.com/vt_082" },

    "kravon": { image: "https://media.discordapp.net/attachments/708562883075637278/1453868016759738434/image.png?ex=694f039a&is=694db21a&hm=e76a330dc6562ada7da72f90e1427f0f767870af06dc639a599377824a17e236&=&format=webp&quality=lossless&width=456&height=353", link: "https://example.com/kravon" },
    "broke_little_girl": { image: "https://media.discordapp.net/attachments/1453623176671264839/1453623305088012369/20251030_0811162.jpg?ex=694ec872&is=694d76f2&hm=ea466153527476d704dce31c64331a4a3c86fd2b4b4fb67e95575f79fb0be6e7&=&format=webp&width=1472&height=821", link: "https://example.com/broke_little_girl" },

    "paws": { image: "https://media.discordapp.net/attachments/1453636909778866187/1453637185906671688/image.png?ex=694ed560&is=694d83e0&hm=9e80a53a50f982f1c862dada07b79a6c4e653989a93e7ada681348e8710259e9&=&format=webp&quality=lossless&width=888&height=758", link: "https://example.com/paws" },
    "kory": { image: "https://media.discordapp.net/attachments/708562883075637278/1453868466456231966/image.png?ex=694f0405&is=694db285&hm=8ac5544316da0361b8fb04807eaba46d125a465f742e527aa81dac4db1ce4296&=&format=webp&quality=lossless&width=504&height=358", link: "https://example.com/kory" },
    "mon": { image: "https://media.discordapp.net/attachments/1453636100147908648/1453636194276737094/image.png?ex=694ed473&is=694d82f3&hm=a83cf446da23341a6eb075800ceb9041d978725a1746d44c004fd071aaf8268a&=&format=webp&quality=lossless&width=997&height=934", link: "https://example.com/mon" },

    "sora_k": { image: "https://media.discordapp.net/attachments/1453635647121129505/1453635747390423164/image.png?ex=694ed409&is=694d8289&hm=404e3c4d20a12610107ab5baa3f149cd213b9cffdf5e5c8be3210318b62ddf4a&=&format=webp&quality=lossless&width=970&height=946", link: "https://example.com/sora_k" },
    "fross": { image: "https://media.discordapp.net/attachments/708562883075637278/1453868950533312534/image.png?ex=694f0479&is=694db2f9&hm=c3f7518ef1c12a35d0691226c6a24839a1cc3f05dd244d5a733c40271249bd3e&=&format=webp&quality=lossless&width=414&height=384", link: "https://example.com/fross" },
    "jessie": { image: "https://media.discordapp.net/attachments/708562883075637278/1453869917865513044/image.png?ex=694f0560&is=694db3e0&hm=eb5c103332dfc181af113f6d03e5016134a5201218dbdcab4ad8251040026d5b&=&format=webp&quality=lossless&width=616&height=440", link: "https://example.com/jessie" },

    "nora": { image: "https://media.discordapp.net/attachments/708562883075637278/1453870103681830973/image.png?ex=694f058c&is=694db40c&hm=ff513b3a824b19324a0ada38a76590da1f43619c698d31d7e9912e46a08fbe62&=&format=webp&quality=lossless&width=422&height=401", link: "https://example.com/nora" },
    "gaia_kurozawa": { image: "https://media.discordapp.net/attachments/708562883075637278/1453869142796144672/image.png?ex=694f04a7&is=694db327&hm=5b4bfd556149dc9a7fc3defb236d119eefa8da1ab624bd3b0d12978aa9703757&=&format=webp&quality=lossless&width=409&height=347", link: "https://example.com/gaia_kurozawa" },

    "uriel": { image: "https://media.discordapp.net/attachments/1453617765616189583/1453618299299696700/20250815_0219142.jpg?ex=694ec3c9&is=694d7249&hm=e51118ce98c36d1bf09f24c2262231f0eb3c933ac55f7cc3d3896f964d248cf4&=&format=webp&width=438&height=946", link: "https://example.com/uriel" },

    "rico_e": { image: "https://i.imgur.com/XXXXX.png", link: "https://example.com/rico_e" },
    "riko_dazhen": { image: "https://media.discordapp.net/attachments/708562883075637278/1453869549303763117/image.png?ex=694f0508&is=694db388&hm=39900e13553ec48ac43de2ef66b0ea50635750eeb8a7459859493e663288af18&=&format=webp&quality=lossless&width=298&height=476", link: "https://example.com/riko_dazhen" },
    "rico_d": { image: "https://media.discordapp.net/attachments/1453634542945702023/1453635280937418925/20251213_0101503.jpg?ex=694ed39a&is=694d821a&hm=f57b91031c10b861f1a1f5338168332e9360879e968725ba8ef1d4fc51196d48&=&format=webp&width=970&height=946", link: "https://example.com/rico_d" },

    "milo": { image: "https://media.discordapp.net/attachments/1453632517218504765/1453632553725464746/Screenshot_2025-12-09_084919.png?ex=694ed10f&is=694d7f8f&hm=25328804aae19b3e3f4c21015ec4169744d326cd97ec8acd6cc2c919b64f0ffa&=&format=webp&quality=lossless&width=619&height=845", link: "https://example.com/milo" },
    "clover": { image: "https://media.discordapp.net/attachments/1453632170563473428/1453632211726237726/Screenshot_2025-12-09_084743.png?ex=694ed0be&is=694d7f3e&hm=a515dbf7b3626c0f4547d0b43c6d150b33cd05381d91b6669ec25fe7187e6e64&=&format=webp&quality=lossless&width=758&height=946", link: "https://example.com/clover" },
    "krahs": { image: "https://media.discordapp.net/attachments/1453631883521818627/1453631926283010058/Screenshot_2025-12-09_084733.png?ex=694ed07a&is=694d7efa&hm=a229368ef4a9639f188c787ae8ede0ec8f40d22df382881d28b76dfc47b3af13&=&format=webp&quality=lossless&width=727&height=941", link: "https://example.com/krahs" },
    "krog": { image: "https://media.discordapp.net/attachments/1453631616583864411/1453631664763703438/Screenshot_2025-12-09_084722.png?ex=694ed03c&is=694d7ebc&hm=52c5d2a2d5fc20754895bf74693cb81b64ae666e884ee29ea164b64a42952b0a&=&format=webp&quality=lossless&width=685&height=946", link: "https://example.com/krog" },
    "rulin": { image: "https://media.discordapp.net/attachments/1453631361272381461/1453631396601139261/Screenshot_2025-12-09_084708.png?ex=694ecffc&is=694d7e7c&hm=cef214370e1d41dc0128bcd1f1348bc47bd2f49950b1b20b39be5eaa71582d04&=&format=webp&quality=lossless&width=676&height=936", link: "https://example.com/rulin" },
    "ulti": { image: "https://media.discordapp.net/attachments/1453630761771991202/1453630801160831219/Screenshot_2025-12-09_084801.png?ex=694ecf6e&is=694d7dee&hm=7da27887f22a9ef36c3a876bf520d98b8c26b87ae11278a1b5b1af9d4b01c54c&=&format=webp&quality=lossless&width=755&height=928", link: "https://example.com/ulti" },
    "vlair": { image: "https://media.discordapp.net/attachments/1453629869937262644/1453629936861712434/Screenshot_2025-12-09_084836.png?ex=694ecea0&is=694d7d20&hm=1dc3e101162a7ea8ce8af6d97cdd0310476f3fabb1e65846cc0438087cdb11f9&=&format=webp&quality=lossless&width=571&height=901", link: "https://example.com/vlair" },
    "monty": { image: "https://media.discordapp.net/attachments/1453630310410621111/1453630350160039997/Screenshot_2025-12-09_084821.png?ex=694ecf02&is=694d7d82&hm=bfe409409e0a1f7b2626270004b169e5223538802d972a4554e4fe123ae53826&=&format=webp&quality=lossless&width=739&height=900", link: "https://example.com/monty" },

    "lora": { image: "https://media.discordapp.net/attachments/1453629454990573579/1453629498225328200/Screenshot_2025-12-09_084901.png?ex=694ece37&is=694d7cb7&hm=038322f3342283617a277257b5fb156cd36858dada6fe2f004faeaf220bf2c64&=&format=webp&quality=lossless&width=690&height=792", link: "https://example.com/lora" },
    "hiroshi": { image: "https://media.discordapp.net/attachments/1453629210458460354/1453629248257658940/Screenshot_2025-12-09_084850.png?ex=694ecdfb&is=694d7c7b&hm=70e629d13f7becd4e4fc53ceda2dc88dfb7f777afd7fdcdace62f80166f21748&=&format=webp&quality=lossless&width=576&height=805", link: "https://example.com/hiroshi" },
    "takeru": { image: "https://media.discordapp.net/attachments/1453628932627628212/1453628973668892742/Screenshot_2025-12-09_084911.png?ex=694ecdba&is=694d7c3a&hm=aaa7d7d922f124fec967148a3f56bb7162bcee407f3754558219cd7397d93c1c&=&format=webp&quality=lossless&width=740&height=850", link: "https://example.com/takeru" },

    "purple_majiranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453871701833154693/image.png?ex=694f0709&is=694db589&hm=5233725fb22693fc149ddea9cbbde8f25637c6e4ca353a45171682c4f1a2bbdc&=&format=webp&quality=lossless&width=414&height=391", link: "https://example.com/purple_majiranger" },
    "teal_majiranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453871794342596782/image.png?ex=694f071f&is=694db59f&hm=02e6679032978ef09e5fea29aef58b7102cc5a47aec19af233aba9390b396e63&=&format=webp&quality=lossless&width=269&height=320", link: "https://example.com/teal_majiranger" },
    "crimson_majiranger": { image: "https://media.discordapp.net/attachments/708562883075637278/1453871919140049170/image.png?ex=694f073d&is=694db5bd&hm=d2b741a726a8c5421d5a942542482a345b2b887e3acaabca0ebc5510d7cca710&=&format=webp&quality=lossless&width=348&height=307", link: "https://example.com/crimson_majiranger" },

    "hope_maji": { image: "https://media.discordapp.net/attachments/708562883075637278/1453874577527799980/image.png?ex=694f09b6&is=694db836&hm=248d775d8fc2f6f6909df6d3fb40d2591fcbc3c70beaa526fdd2f9d06426fc89&=&format=webp&quality=lossless&width=587&height=286", link: "https://example.com/hope_maji" },
    "despair_maji": { image: "https://media.discordapp.net/attachments/1446212606649176166/1453640030324133931/image.png?ex=694ed806&is=694d8686&hm=60d84298567615c0cd4dfd92cb26dee22cab957b3abdd70b61cf77ac74858196&=&format=webp&quality=lossless&width=1254&height=715", link: "https://example.com/despair_maji" },
    "convergence_maji": { image: "https://media.discordapp.net/attachments/1446212606649176166/1453640574245666876/image.png?ex=694ed888&is=694d8708&hm=d2448b54473f58fa51d9a05752af256ec600fff053d1bb69dff95eb9cf12f03b&=&format=webp&quality=lossless&width=589&height=944", link: "https://example.com/convergence_maji" },
    "bacteria_maji": { image: "https://media.discordapp.net/attachments/1446212176393015386/1453639135645405247/image.png?ex=694ed731&is=694d85b1&hm=9c157194a0e4d515b54ffad12a0baea8466b6dd621215364612069a2f7221ce5&=&format=webp&quality=lossless&width=547&height=923", link: "https://example.com/bacteria_maji" },
    "mycelium_maji": { image: "https://media.discordapp.net/attachments/1446212176393015386/1453639560167817236/image.png?ex=694ed796&is=694d8616&hm=8b5158fc1c3d04a36741508e6f195dba63a53e8b85829357db38a6207eff87c1&=&format=webp&quality=lossless&width=581&height=924", link: "https://example.com/mycelium_maji" },
    "thorn_maji": { image: "https://media.discordapp.net/attachments/1446211839053791364/1453606198711550076/20250713_2210242.jpg?ex=694eb884&is=694d6704&hm=a86e6dc72f886f980406940d65800d09858262bec48295fa46a7bbe7a131980f&=&format=webp&width=1268&height=934", link: "https://example.com/thorn_maji" },
    "drool_maji": { image: "https://media.discordapp.net/attachments/1446211839053791364/1453606198711550076/20250713_2210242.jpg?ex=694eb884&is=694d6704&hm=a86e6dc72f886f980406940d65800d09858262bec48295fa46a7bbe7a131980f&=&format=webp&width=1268&height=934", link: "https://example.com/drool_maji" },

    "goat_maji_hybrid": { image: "https://media.discordapp.net/attachments/1391339756440387604/1393728060452376646/20250712_0740142.jpg?ex=694e6a27&is=694d18a7&hm=8dea02fdabdef3b5dd0a3a992862fb91a6fd73c6ed51da9ac1a8a4d2aaf91822&=&format=webp&width=568&height=946", link: "https://example.com/goat_maji_hybrid" },
    "bananasaurous_maji": { image: "https://media.discordapp.net/attachments/1446211839053791364/1453612142594101350/20250714_0454272.jpg?ex=694ebe0d&is=694d6c8d&hm=ee3456113b0a8322044432b747bff1ec6661ca10c14e0ad190c3395ef176238e&=&format=webp&width=938&height=946", link: "https://example.com/bananasaurous_maji" },
    "shark_maji": { image: "https://media.discordapp.net/attachments/1446211839053791364/1453615667851825256/20250723_0755332.jpg?ex=694ec156&is=694d6fd6&hm=a5ea051a63ffa9e3d57d6b9568351cdd9164f5848097f76d1535c9c1c88f84b0&=&format=webp&width=842&height=946", link: "https://example.com/shark_maji" },
    "mental_lobster_maji": { image: "https://media.discordapp.net/attachments/1446211839053791364/1453619966942253086/20251017_0233172.jpg?ex=694ec557&is=694d73d7&hm=f05975865b34974732b3b8d142ba359c9ad4865a2420df0b11bcfbd3158d5197&=&format=webp&width=595&height=946", link: "https://example.com/mental_lobster_maji" },
    "pencil_maji": { image: "https://media.discordapp.net/attachments/1446211440384938044/1453615162543050795/20250723_0754482.jpg?ex=694ec0dd&is=694d6f5d&hm=a20c6aef980d325fa7367c1ffd389afa9df76a941743f5fbb15e7c932bfdf3f9&=&format=webp&width=954&height=946", link: "https://example.com/pencil_maji" },
    "lettuce_maji": { image: "https://media.discordapp.net/attachments/708562883075637278/1453875625051033620/image.png?ex=694f0ab0&is=694db930&hm=f5f0f382e32d89f8ddb8f3905cceb9416b340f23ba15d1490a4a1829967e8c65&=&format=webp&quality=lossless&width=461&height=505", link: "https://example.com/lettuce_maji" },
    "capture_maji": { image: "https://media.discordapp.net/attachments/708562883075637278/1453875710992060568/image.png?ex=694f0ac5&is=694db945&hm=0e9119c060ab22904f788d3df5cc630acb90357e27bb8b1b1872aba846e7bdc2&=&format=webp&quality=lossless&width=439&height=368", link: "https://example.com/capture_maji" },
    "frog_maji_hybrid": { image: "https://media.discordapp.net/attachments/1446211440384938044/1453622014324637736/20251030_0812282.jpg?ex=694ec73f&is=694d75bf&hm=0b22580d8dbe6bc231d2b60eadac802239ba72b9ee3d352c2c84601fb1320b97&=&format=webp&width=463&height=946", link: "https://example.com/frog_maji_hybrid" },
    "immortality_maji": { image: "https://media.discordapp.net/attachments/1446211440384938044/1453643679884382331/Screenshot_2025-12-22_202257.png?ex=694edb6c&is=694d89ec&hm=4925fe9802bc3a5a750d326d763329550349cf489344bd78da47f22f9fb80171&=&format=webp&quality=lossless&width=875&height=946", link: "https://example.com/immortality_maji" },
    "sphinx_maji": { image: "https://media.discordapp.net/attachments/1446211440384938044/1453609040901836914/20250713_2210322.jpg?ex=694ebb2a&is=694d69aa&hm=65e6980673d9c265c4c731b9cb6f2fe85d1b7894d411beaddff2036e39add698&=&format=webp&width=836&height=946", link: "https://example.com/sphinx_maji" },

    "azriel_polaris": { image: "https://media.discordapp.net/attachments/708562883075637278/1453876460757713039/image.png?ex=694f0b77&is=694db9f7&hm=23f69dcc4f02ab6c8a5b55179d0e10cdd77e7d966ff2345749d3d256cdf3050b&=&format=webp&quality=lossless&width=1206&height=434", link: "https://example.com/azriel_polaris" },
    "mother_spica": { image: "https://media.discordapp.net/attachments/708562883075637278/1453876257870708778/image.png?ex=694f0b47&is=694db9c7&hm=d503db682c6f086ee3ef75ae8b1247ca933d579c4ab384a27b130583d64812e5&=&format=webp&quality=lossless&width=270&height=269", link: "https://example.com/mother_spica" },
    "artoria": { image: "https://media.discordapp.net/attachments/708562883075637278/1453876612629270528/image.png?ex=694f0b9c&is=694dba1c&hm=07b06b73404c50ad42bb5df5afd0fcbc5de710604cc2a00f00cf30ddeec1d702&=&format=webp&quality=lossless&width=462&height=373", link: "https://example.com/artoria" },
    "manager": { image: "https://media.discordapp.net/attachments/1446147363885547531/1452886551984869417/20251222_0802282.jpg?ex=694ebd4b&is=694d6bcb&hm=c3968d4f48bdc5d732da234f7bb05023f556bc6ea8c43e160f65d4deba539b4f&=&format=webp&width=1117&height=946", link: "https://example.com/manager" },

    "ashen_star": { image: "https://media.discordapp.net/attachments/708562883075637278/1453877147876851794/image.png?ex=694f0c1b&is=694dba9b&hm=2cf243a236f990a64ea45261ec55375afe0855fe5afd144c1f20d21e2c24040a&=&format=webp&quality=lossless&width=246&height=208", link: "https://example.com/ashen_star" },
    "greed_maji": { image: "https://media.discordapp.net/attachments/1386413633013153915/1433305659952336927/image.png?ex=694eb22a&is=694d60aa&hm=927bd088b6bb5918988d54a414172d954601d4a5b555302b7dbbca3a9a48d348&=&format=webp&quality=lossless&width=618&height=799", link: "https://example.com/greed_maji" },
    "donna": { image: "https://media.discordapp.net/attachments/708562883075637278/1453877458875973662/image.png?ex=694f0c65&is=694dbae5&hm=73e5185a281ee768dc3cfe9d1322226428d84c7940fea6a2e2f3fe37127f6ff8&=&format=webp&quality=lossless&width=263&height=319", link: "https://example.com/donna" },
    "bowens_mom": { image: "https://media.discordapp.net/attachments/708562883075637278/1453877615319580782/image.png?ex=694f0c8b&is=694dbb0b&hm=317d9c25a52c7bdde0cb97fff48773aea277fc90a6b08cf1dc54e181a5a3f469&=&format=webp&quality=lossless&width=527&height=482", link: "https://example.com/bowens_mom" },

    "soul_bread_baker": { image: "https://media.discordapp.net/attachments/708562883075637278/1453877827379396769/image.png?ex=694f0cbd&is=694dbb3d&hm=66d0b54a86342552b7962bdbcb088a0b973ab4f9c34b1d8db8aac64b25b21574&=&format=webp&quality=lossless&width=233&height=356", link: "https://example.com/soul_bread_baker" },

    "walking_tree_maji": { image: "https://media.discordapp.net/attachments/1446211440384938044/1453623677844455557/20251118_0501172.jpg?ex=694ec8cb&is=694d774b&hm=4fbcb56a456cfc4d5cf7d28bfb374877950e5d40ee13d2ec4c5987b443d6ac1f&=&format=webp&width=602&height=946", link: "https://example.com/walking_tree_maji" }
  };

  /***********************
   * SAFETY NET HELPERS
   ***********************/
  const $ = (sel) => document.querySelector(sel);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const num = (v, fallback = 0) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : fallback;
  };

  function safeText(el, txt){ if(el) el.textContent = String(txt); }
  function safeHref(el, href){
    if(!el) return;
    el.href = href || "#";
    el.style.opacity = (href && href !== "#") ? "1" : "0.6";
  }
  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[m]));
  }
  function placeholderImg(name){
    const n = encodeURIComponent((name || "GB").slice(0, 18));
    return `https://dummyimage.com/256x256/0b1a33/f3d27b.png&text=${n}`;
  }

  /***********************
   * ERROR BANNER
   ***********************/
  function showFatal(msg){
    let b = $("#bootBanner");
    let m = $("#bootMsg");
    if(!b){
      b = document.createElement("div");
      b.id = "bootBanner";
      b.style.position = "fixed";
      b.style.left = "12px";
      b.style.right = "12px";
      b.style.bottom = "12px";
      b.style.zIndex = "99999";
      b.style.padding = "12px 14px";
      b.style.borderRadius = "12px";
      b.style.border = "1px solid rgba(255,255,255,.14)";
      b.style.background = "rgba(0,0,0,.55)";
      b.style.backdropFilter = "blur(10px)";
      b.style.lineHeight = "1.35";
      b.style.fontSize = "13px";
      b.innerHTML = `<b style="color:#f3d27b">JS Error:</b> <span id="bootMsg"></span>`;
      document.body.appendChild(b);
      m = $("#bootMsg");
    }
    if(m) m.textContent = msg;
    b.style.display = "block";
  }

  if(entityMedia && typeof entityMedia !== "object"){
    showFatal("entityMedia must be an object: { id: {image, link} }");
  }

  /***********************
   * SAGA-1 ARCS
   ***********************/
  const ARCS = [
    { id: 0, name: "Arc #0 — Introduction", date: "7/6/2025" },
    { id: 1, name: "Arc #1 — Twinsy Conflicts Flix", date: "7/8/2025" },
    { id: 2, name: "Arc #2 — Leo’s Egotistical Ego", date: "7/10/2025" },
    { id: 3, name: "Arc #3", date: "" },
    { id: 4, name: "Arc #4", date: "" },
    { id: 5, name: "Arc #5", date: "" },
  ];

  /***********************
   * mk() + BASE LIST
   * mk(id, name, type, arcs, debutOrder, popularity, potential, basePrice)
   ***********************/
  function mk(id, name, type, arcs, debutOrder, popularity, potential, basePrice){
    return {
      id, name, type,
      arcs: Array.isArray(arcs) ? arcs : [],
      debutOrder: num(debutOrder, 9999),
      popularity: clamp(num(popularity, 500), 1, 1000),
      potential: clamp(num(potential, 500), 1, 1000),

      points: clamp(num(basePrice, 300), 1, 1000),

      // ADMIN/CONTROL FIELDS (persisted)
      cap: 1000,
      frozen: false,     // “stagnate”
      volMult: 1,        // per-character volatility multiplier

      lastDelta: 0,
      ticker: "GBX",
      history: [],
      ticks: []
    };
  }

  const BASE_CHARACTERS = [
    mk("kaien_dazhen", "Kaien Dazhen", "human", [0,1,2,3,4,5], 100, 380, 520, 180),
    mk("raijin_kurozawa", "Raijin Kurozawa", "human", [0,1,2,3,4,5], 101, 820, 900, 420),

    mk("lara_kurozawa", "Lara Kurozawa", "human", [5], 102, 520, 720, 260),
    mk("yankovich_dazhen", "Yankovich Dazhen", "human", [5], 50, 680, 780, 320),

    mk("kopa", "Kopa", "human", [4], 12, 360, 520, 160),
    mk("old_man", "The Old Man", "npc", [0,1], 1, 420, 500, 140),

    mk("leo", "Leo", "zodiac", [2], 70, 880, 960, 520),
    mk("virgo", "Virgo", "zodiac", [2,3], 71, 820, 920, 480),
    mk("pisces", "Pisces", "zodiac", [1,2,4], 72, 760, 890, 440),
    mk("capricorn", "Capricorn", "zodiac", [5], 73, 740, 880, 430),
    mk("scorpio", "Scorpio", "zodiac", [5], 74, 730, 870, 420),

    mk("white_ranger", "White Ranger", "neo", [0,2,4], 10, 650, 740, 320),
    mk("pink_neo_ranger", "Pink Neo-Ranger", "neo", [3], 210, 720, 820, 360),
    mk("gold_neo_ranger", "Gold Neo-Ranger", "neo", [2], 211, 700, 820, 360),
    mk("kyro_okabe", "Kyro Okabe (Red Neo-Ranger)", "neo", [3], 200, 800, 860, 410),
    mk("vt_082", "V.T-082 (Blue Neo-Ranger?)", "neo", [4], 205, 600, 720, 300),

    mk("kravon", "Kravon", "human", [4], 16, 520, 720, 250),
    mk("broke_little_girl", "Broke Little Girl", "npc", [4], 17, 250, 500, 80),

    mk("paws", "Paws", "ranger", [5], 300, 420, 600, 220),
    mk("kory", "Kory", "ranger", [5], 301, 420, 600, 220),
    mk("mon", "Mon", "ranger", [5], 302, 420, 600, 220),

    mk("sora_k", "Sora, K", "ranger", [5], 310, 520, 680, 260),
    mk("fross", "Fross", "ranger", [5], 311, 480, 640, 240),
    mk("jessie", "Jessie", "ranger", [5], 312, 560, 720, 280),

    mk("nora", "Nora", "human", [5], 313, 560, 710, 270),
    mk("gaia_kurozawa", "Gaia Kurozawa", "human", [4], 314, 460, 680, 220),

    mk("uriel", "Uriel", "ranger", [4], 315, 510, 690, 260),

    mk("rico_e", "E", "human", [5], 316, 440, 640, 230),
    mk("riko_dazhen", "Riko Dazhen", "human", [5], 317, 470, 700, 250),
    mk("rico_d", "Rico D", "human", [5], 318, 470, 700, 250),

    mk("milo", "Milo", "npc", [5], 400, 340, 560, 140),
    mk("clover", "Clover", "npc", [5], 401, 260, 520, 110),
    mk("krahs", "Krahs", "npc", [5], 402, 260, 520, 110),
    mk("krog", "Krog", "npc", [5], 403, 260, 520, 110),
    mk("rulin", "Rulin", "npc", [5], 404, 260, 520, 110),
    mk("ulti", "Ulti", "npc", [5], 405, 260, 520, 110),
    mk("monty", "Monty", "npc", [5], 410, 260, 520, 110),
    mk("vlair", "Vlair", "npc", [5], 411, 320, 600, 160),

    mk("lora", "Lora", "npc", [5], 420, 280, 540, 120),
    mk("hiroshi", "Hiroshi", "npc", [5], 421, 310, 560, 140),
    mk("takeru", "Takeru", "npc", [5], 422, 380, 660, 180),

    mk("purple_majiranger", "Purple MajiRanger", "ranger", [5], 500, 520, 720, 260),
    mk("teal_majiranger", "Teal MajiRanger", "ranger", [3,5], 501, 520, 720, 260),
    mk("crimson_majiranger", "Crimson MajiRanger", "ranger", [3,5], 502, 520, 720, 260),

    mk("hope_maji", "Hope Maji", "maji", [4], 600, 840, 950, 520),
    mk("despair_maji", "Despair Maji", "maji", [5], 601, 760, 900, 440),
    mk("convergence_maji", "Convergence Maji", "maji", [5], 602, 620, 820, 360),
    mk("bacteria_maji", "Bacteria Maji", "maji", [5], 603, 640, 830, 380),
    mk("mycelium_maji", "Mycelium Maji", "maji", [5], 604, 700, 860, 410),
    mk("thorn_maji", "Thorn Maji", "maji", [0], 605, 520, 720, 260),
    mk("drool_maji", "Drool Maji", "maji", [1], 606, 560, 740, 280),

    mk("goat_maji_hybrid", "Goat Maji Hybrid", "hybrid", [2], 607, 540, 760, 300),
    mk("bananasaurous_maji", "Bananasaurous Maji", "maji", [2], 608, 580, 780, 320),
    mk("shark_maji", "Shark Maji", "maji", [3], 609, 560, 740, 280),
    mk("mental_lobster_maji", "Mental Lobster Maji", "maji", [4], 610, 620, 800, 360),
    mk("pencil_maji", "Pencil Maji", "maji", [3], 611, 520, 700, 240),
    mk("lettuce_maji", "Lettuce Maji", "maji", [4], 612, 520, 740, 280),
    mk("capture_maji", "Capture Maji", "maji", [4], 613, 620, 820, 360),
    mk("frog_maji_hybrid", "Frog Maji (Hybrid)", "hybrid", [4], 614, 540, 740, 300),
    mk("immortality_maji", "Immortality Maji", "maji", [4], 617, 740, 940, 480),
    mk("sphinx_maji", "Sphinx Maji", "maji", [2,4], 618, 720, 880, 420),

    mk("azriel_polaris", "Azriel Polaris", "human", [5], 700, 740, 860, 420),
    mk("mother_spica", "Mother Spica", "human", [5], 701, 700, 820, 400),
    mk("artoria", "Artoria", "human", [5], 702, 680, 820, 380),
    mk("manager", "Manager", "npc", [5], 703, 360, 540, 160),

    mk("ashen_star", "Ashen Star", "npc", [3,5], 710, 520, 780, 300),
    mk("greed_maji", "Greed Maji", "maji", [4], 720, 720, 920, 460),
    mk("donna", "Donna", "human", [3], 721, 420, 640, 210),
    mk("bowens_mom", "Bowen's Mom", "human", [3], 722, 240, 520, 120),

    mk("soul_bread_baker", "Soul Bread Baker", "npc", [2], 800, 360, 680, 180),
    mk("walking_tree_maji", "Walking Tree Maji", "maji", [4], 902, 420, 720, 220),
  ];

  /***********************
   * STORAGE KEYS
   ***********************/
  const LS = {
    MARKET: "gb_market_ui_v10",
    PORT: "gb_portfolio_ui_v10",
    UI: "gb_ui_state_v10",
    WANTED: "gb_wanted_v10",
    EDIT_MEDIA: "gb_entity_media_v10",      // image/link edits
    ADMIN: "gb_admin_state_v10",            // caps/frozen/volMult
    PICKS: "gb_bulk_picks_v10",             // multi-buy selected ids
  };

  const MAX_HISTORY = 90;

  /***********************
   * LOAD + APPLY MEDIA OVERRIDES (Edit panel)
   ***********************/
  let mediaOverrides = loadJSON(LS.EDIT_MEDIA, {});
  if(!mediaOverrides || typeof mediaOverrides !== "object") mediaOverrides = {};

  /***********************
   * LOAD STATE
   ***********************/
  let market = loadJSON(LS.MARKET, null);
  let portfolio = loadJSON(LS.PORT, null);
  const ui = loadJSON(LS.UI, {
    arc: "all",
    type: "all",
    sort: "pop_desc",
    search: "",
    speedMs: 500
  }) || { arc:"all", type:"all", sort:"pop_desc", search:"", speedMs:500 };

  market = validateOrInitMarket(market);
  portfolio = validateOrInitPortfolio(portfolio);

  // ADMIN STATE: per-id overrides (cap/frozen/volMult)
  let adminState = loadJSON(LS.ADMIN, {});
  if(!adminState || typeof adminState !== "object") adminState = {};
  applyAdminStateToMarket();

  let wantedId = loadJSON(LS.WANTED, null);
  if(!wantedId || !market.byId[wantedId]){
    wantedId = market.list[0]?.id || null;
    saveJSON(LS.WANTED, wantedId);
  }

  let selectedId = null;
  let simTimer = null;

  // Bulk picks (multi buy)
  let picks = loadJSON(LS.PICKS, []);
  if(!Array.isArray(picks)) picks = [];
  const picksSet = new Set(picks.filter(id => typeof id === "string"));

  /***********************
   * DOM HOOKS
   ***********************/
  const dayEl = $("#dayEl");
  const balanceEl = $("#balanceEl");
  const netWorthEl = $("#netWorthEl");

  const searchInput = $("#searchInput");
  const arcSelect = $("#arcSelect");
  const typeSelect = $("#typeSelect");
  const sortSelect = $("#sortSelect");
  const resultCount = $("#resultCount");

  const indexEl = $("#indexEl");
  const indexDeltaEl = $("#indexDeltaEl");
  const indexChart = $("#indexChart");

  const gainersList = $("#gainersList");
  const losersList = $("#losersList");

  const playBtn = $("#playBtn");
  const pauseBtn = $("#pauseBtn");
  const step1Btn = $("#step1Btn");
  const step10Btn = $("#step10Btn");
  const speedSelect = $("#speedSelect");

  const globalVol = $("#globalVol");

  const projectsGrid = $("#projectsGrid");

  const positionsCount = $("#positionsCount");
  const nwDeltaEl = $("#nwDeltaEl");
  const netWorthChart = $("#netWorthChart");
  const portfolioList = $("#portfolioList");

  // Wanted
  const wantedImg = $("#wantedImg");
  const wantedName = $("#wantedName");
  const wantedRole = $("#wantedRole");
  const wantedPrice = $("#wantedPrice");
  const wantedOwned = $("#wantedOwned");
  const wantedPop = $("#wantedPop");
  const wantedPot = $("#wantedPot");
  const wantedCap = $("#wantedCap");
  const wantedFrozen = $("#wantedFrozen");
  const wantedBuyBtn = $("#wantedBuyBtn");
  const wantedSellBtn = $("#wantedSellBtn");
  const wantedLinkBtn = $("#wantedLinkBtn");

  // Modal
  const modalBackdrop = $("#modalBackdrop");
  const detailModal = $("#detailModal");
  const closeModalBtn = $("#closeModalBtn");
  const modalName = $("#modalName");
  const modalMeta = $("#modalMeta");
  const modalImg = $("#modalImg");
  const modalLinkBtn = $("#modalLinkBtn");
  const modalBuyBtn = $("#modalBuyBtn");
  const modalSellBtn = $("#modalSellBtn");
  const modalPrice = $("#modalPrice");
  const modalOwned = $("#modalOwned");
  const modalPotential = $("#modalPotential");
  const modalPop = $("#modalPop");
  const modalCap = $("#modalCap");
  const modalFrozen = $("#modalFrozen");
  const spark = $("#spark");
  const historyList = $("#historyList");

  // Nav pills + panels
  const navBtns = Array.from(document.querySelectorAll("[data-nav]"));
  const marketPanel = $("#marketPanel");
  const projectsPanel = $("#projectsPanel");
  const editPanel = $("#editPanel");

  // Edit panel (media)
  const editCharSelect = $("#editCharSelect");
  const editImg = $("#editImg");
  const editLink = $("#editLink");
  const saveEditBtn = $("#saveEditBtn");
  const resetEditBtn = $("#resetEditBtn");
  const bulkJson = $("#bulkJson");
  const applyBulkBtn = $("#applyBulkBtn");

  // Admin panel
  const adminSetPrice = $("#adminSetPrice");
  const adminSetCap = $("#adminSetCap");
  const adminFreeze = $("#adminFreeze");
  const adminVolMult = $("#adminVolMult");
  const adminApplyBtn = $("#adminApplyBtn");
  const adminNukeHistoryBtn = $("#adminNukeHistoryBtn");

  const newId = $("#newId");
  const newName = $("#newName");
  const newType = $("#newType");
  const newArcs = $("#newArcs");
  const newPop = $("#newPop");
  const newPot = $("#newPot");
  const newImpact = $("#newImpact");
  const addCharBtn = $("#addCharBtn");
  const removeCharBtn = $("#removeCharBtn");

  // lock edit panel controls on boot until authed
  setEditPanelEnabled(isEditAuthed());

  /***********************
   * INIT SELECTS
   ***********************/
  if(arcSelect){
    arcSelect.innerHTML =
      `<option value="all">All SAGA-1 Arcs</option>` +
      ARCS.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join("");
    arcSelect.value = ui.arc ?? "all";
  }
  if(typeSelect) typeSelect.value = ui.type ?? "all";
  if(sortSelect) sortSelect.value = ui.sort ?? "pop_desc";
  if(searchInput) searchInput.value = ui.search ?? "";
  if(speedSelect) speedSelect.value = String(ui.speedMs ?? 500);

  if(globalVol){
    // default if empty
    const stored = loadJSON("gb_global_vol_v10", 1);
    globalVol.value = String(clamp(num(stored, 1), 0.1, 10));
  }

  /***********************
   * BULK BAR (multi-buy) - injected (no HTML edits needed)
   ***********************/
  let bulkQtyInput, bulkBuyBtn, bulkSellBtn, bulkClearBtn, bulkCountEl, bulkSelectAllBtn, bulkSelectNoneBtn;
  injectBulkBar();

  function injectBulkBar(){
    if(!marketPanel) return;

    // avoid duplicates
    if($("#bulkBar")) return;

    const wrap = document.createElement("div");
    wrap.id = "bulkBar";
    wrap.className = "bulkBar";
    wrap.innerHTML = `
      <div class="bulkLeft">
        <div class="qtyMini">
          <label for="qtyInput">Qty</label>
          <input id="qtyInput" class="input" type="number" min="1" max="999" value="1" />
        </div>
        <div class="bulkCount">Selected: <span id="bulkCount">0</span></div>
        <button id="bulkAll" class="btn ghost" type="button">Select All</button>
        <button id="bulkNone" class="btn ghost" type="button">Clear</button>
      </div>
      <div class="bulkRight">
        <button id="bulkBuy" class="btn buy" type="button">BUY Selected</button>
        <button id="bulkSell" class="btn sell" type="button">SELL Selected</button>
      </div>
    `;
    marketPanel.appendChild(wrap);

    bulkQtyInput = $("#qtyInput");
    bulkBuyBtn = $("#bulkBuy");
    bulkSellBtn = $("#bulkSell");
    bulkClearBtn = $("#bulkNone");
    bulkCountEl = $("#bulkCount");
    bulkSelectAllBtn = $("#bulkAll");
    bulkSelectNoneBtn = $("#bulkNone");

    const updateCount = () => {
      if(bulkCountEl) bulkCountEl.textContent = String(picksSet.size);
      saveJSON(LS.PICKS, Array.from(picksSet));
    };

    if(bulkBuyBtn){
      bulkBuyBtn.addEventListener("click", () => {
        const qty = getQty();
        buyMany(Array.from(picksSet), qty);
        updateCount();
      });
    }
    if(bulkSellBtn){
      bulkSellBtn.addEventListener("click", () => {
        const qty = getQty();
        sellMany(Array.from(picksSet), qty);
        updateCount();
      });
    }
    if(bulkSelectAllBtn){
      bulkSelectAllBtn.addEventListener("click", () => {
        for(const c of getFilteredSorted()){
          picksSet.add(c.id);
        }
        updateCount();
        renderProjects(); // refresh checkboxes
      });
    }
    if(bulkSelectNoneBtn){
      bulkSelectNoneBtn.addEventListener("click", () => {
        picksSet.clear();
        updateCount();
        renderProjects();
      });
    }

    updateCount();
  }

  /***********************
   * NAV
   ***********************/
  function setActivePanel(which){
    // Your layout uses Market+Projects together visually, but you still wanted nav buttons.
    // We'll do: market/projects show projectsPanel + marketPanel; edit shows editPanel.

    if(which === "edit"){
      // PASSWORD GATE
      const ok = requireEditAuth();
      if(!ok){
        // stay on market view
        if(editPanel) editPanel.style.display = "none";
        if(projectsPanel) projectsPanel.style.display = "";
        if(marketPanel) marketPanel.style.display = "";
        navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav !== "edit" && b.dataset.nav === "market"));
        return;
      }

      if(editPanel) editPanel.style.display = "";
      if(projectsPanel) projectsPanel.style.display = "none";
      if(marketPanel) marketPanel.style.display = "none";
      setEditPanelEnabled(true);
    }else{
      if(editPanel) editPanel.style.display = "none";
      if(projectsPanel) projectsPanel.style.display = "";
      if(marketPanel) marketPanel.style.display = "";
    }

    navBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === which));
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => setActivePanel(btn.dataset.nav));
  });

  // default
  setActivePanel("market");

  /***********************
   * LISTENERS: Filters
   ***********************/
  if(searchInput){
    searchInput.addEventListener("input", () => {
      ui.search = searchInput.value;
      persistUI();
      renderAll();
    });
  }
  if(arcSelect){
    arcSelect.addEventListener("change", () => {
      ui.arc = arcSelect.value;
      persistUI();
      renderAll();
    });
  }
  if(typeSelect){
    typeSelect.addEventListener("change", () => {
      ui.type = typeSelect.value;
      persistUI();
      renderAll();
    });
  }
  if(sortSelect){
    sortSelect.addEventListener("change", () => {
      ui.sort = sortSelect.value;
      persistUI();
      renderAll();
    });
  }

  if(playBtn) playBtn.addEventListener("click", startSim);
  if(pauseBtn) pauseBtn.addEventListener("click", stopSim);
  if(step1Btn) step1Btn.addEventListener("click", () => tickN(1));
  if(step10Btn) step10Btn.addEventListener("click", () => tickN(10));

  if(speedSelect){
    speedSelect.addEventListener("change", () => {
      ui.speedMs = num(speedSelect.value, 500);
      persistUI();
      if(simTimer){ stopSim(); startSim(); }
    });
  }

  if(globalVol){
    globalVol.addEventListener("change", () => {
      const v = clamp(num(globalVol.value, 1), 0.1, 10);
      globalVol.value = String(v);
      saveJSON("gb_global_vol_v10", v);
    });
  }

  if(closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if(modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

  if(wantedBuyBtn) wantedBuyBtn.addEventListener("click", () => wantedId && buy(wantedId, getQty()));
  if(wantedSellBtn) wantedSellBtn.addEventListener("click", () => wantedId && sell(wantedId, getQty()));

  /***********************
   * EDIT PANEL: image/link overrides
   ***********************/
  initEditPanel();

  function initEditPanel(){
    if(!editCharSelect) return;

    const refreshSelect = () => {
      editCharSelect.innerHTML = market.list
        .slice()
        .sort((a,b)=> a.name.localeCompare(b.name))
        .map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)} (${escapeHtml(c.id)})</option>`)
        .join("");
    };

    refreshSelect();

    const loadSelected = () => {
      const id = editCharSelect.value;
      const o = mediaOverrides[id] || {};
      if(editImg) editImg.value = o.image || "";
      if(editLink) editLink.value = o.link || "";
      // also sync admin controls to selected
      syncAdminFormTo(id);
    };

    editCharSelect.addEventListener("change", loadSelected);
    loadSelected();

    if(saveEditBtn){
      saveEditBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = editCharSelect.value;
        if(!id) return;
        const img = String(editImg?.value || "").trim();
        const link = String(editLink?.value || "").trim();

        mediaOverrides[id] = { image: img, link };
        saveJSON(LS.EDIT_MEDIA, mediaOverrides);
        renderAll();
      });
    }

    if(resetEditBtn){
      resetEditBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        const id = editCharSelect.value;
        if(!id) return;
        delete mediaOverrides[id];
        saveJSON(LS.EDIT_MEDIA, mediaOverrides);
        if(editImg) editImg.value = "";
        if(editLink) editLink.value = "";
        renderAll();
      });
    }

    if(applyBulkBtn){
      applyBulkBtn.addEventListener("click", () => {
        if(!isEditAuthed()) return;
        try{
          const raw = String(bulkJson?.value || "").trim();
          if(!raw) return;
          const obj = JSON.parse(raw);
          if(!obj || typeof obj !== "object") return;

          for(const [id, v] of Object.entries(obj)){
            if(!v || typeof v !== "object") continue;
            mediaOverrides[id] = {
              image: typeof v.image === "string" ? v.image.trim() : (mediaOverrides[id]?.image || ""),
              link: typeof v.link === "string" ? v.link.trim() : (mediaOverrides[id]?.link || ""),
            };
          }
          saveJSON(LS.EDIT_MEDIA, mediaOverrides);
          renderAll();
        }catch(e){
          showFatal("Bulk JSON invalid: " + (e?.message || e));
        }
      });
    }

    // keep select list updated if you add/remove characters
    market._refreshEditSelect = refreshSelect;
  }

  /***********************
   * ADMIN PANEL
   ***********************/
  function syncAdminFormTo(id){
    const c = market.byId[id];
    if(!c) return;

    if(adminSetPrice) adminSetPrice.value = String(Math.floor(c.points));
    if(adminSetCap) adminSetCap.value = String(Math.floor(c.cap ?? 1000));
    if(adminFreeze) adminFreeze.value = String(Boolean(c.frozen));
    if(adminVolMult) adminVolMult.value = String(num(c.volMult, 1));
  }

  if(editCharSelect){
    // initial sync
    syncAdminFormTo(editCharSelect.value);
  }

  if(adminApplyBtn){
    adminApplyBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const c = market.byId[id];
      if(!c) return;

      const capV = clamp(num(adminSetCap?.value, c.cap ?? 1000), 1, 1000);
      const priceV = clamp(num(adminSetPrice?.value, c.points), 1, capV);
      const frozenV = String(adminFreeze?.value) === "true";
      const volV = clamp(num(adminVolMult?.value, c.volMult ?? 1), 0.1, 10);

      c.cap = capV;
      c.points = clamp(priceV, 1, c.cap);
      c.frozen = frozenV;
      c.volMult = volV;

      // keep history consistent
      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : [];
      if(!c.history.length) c.history = seedHistory(c.points);
      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();

      // persist adminState
      adminState[id] = { cap: c.cap, frozen: c.frozen, volMult: c.volMult };
      saveJSON(LS.ADMIN, adminState);

      saveJSON(LS.MARKET, market);
      renderAll();
      if(selectedId === id) openDetailModal(id);
    });
  }

  if(adminNukeHistoryBtn){
    adminNukeHistoryBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const c = market.byId[id];
      if(!c) return;

      c.history = seedHistory(c.points);
      c.ticks = [];
      c.lastDelta = 0;

      saveJSON(LS.MARKET, market);
      renderAll();
      if(selectedId === id) openDetailModal(id);
    });
  }

  if(addCharBtn){
    addCharBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = sanitizeId(String(newId?.value || ""));
      const name = String(newName?.value || "").trim();
      if(!id || !name) return;
      if(market.byId[id]) return;

      const type = String(newType?.value || "npc");
      const arcs = parseArcs(String(newArcs?.value || ""));
      const pop = clamp(num(newPop?.value, 500), 1, 1000);
      const pot = clamp(num(newPot?.value, 500), 1, 1000);
      const impact = clamp(num(newImpact?.value, 300), 1, 1000);

      const debut = (market.list.reduce((m,c)=> Math.max(m, num(c.debutOrder, 0)), 0) + 1);

      const basePrice = clamp(Math.round((pop*0.35 + pot*0.45 + impact*0.20) / 2), 1, 1000);

      const c = mk(id, name, type, arcs, debut, pop, pot, basePrice);
      c.ticker = tickerFrom(c);
      c.cap = 1000;
      c.frozen = false;
      c.volMult = 1;
      c.history = seedHistory(c.points);
      c.ticks = [];
      c.lastDelta = 0;

      market.list.push(c);
      market.byId[c.id] = c;

      // refresh index + persist
      updateIndex();
      saveJSON(LS.MARKET, market);

      // refresh edit select
      market._refreshEditSelect && market._refreshEditSelect();
      if(editCharSelect){
        editCharSelect.value = id;
        if(editCharSelect.dispatchEvent) editCharSelect.dispatchEvent(new Event("change"));
      }

      renderAll();
    });
  }

  if(removeCharBtn){
    removeCharBtn.addEventListener("click", () => {
      if(!isEditAuthed()) return;
      const id = editCharSelect?.value;
      if(!id) return;
      const exists = market.byId[id];
      if(!exists) return;

      // remove from market
      market.list = market.list.filter(x => x.id !== id);
      delete market.byId[id];

      // remove holdings + picks + overrides + admin
      delete portfolio.positions?.[id];
      picksSet.delete(id);
      delete mediaOverrides[id];
      delete adminState[id];

      saveJSON(LS.PICKS, Array.from(picksSet));
      saveJSON(LS.EDIT_MEDIA, mediaOverrides);
      saveJSON(LS.ADMIN, adminState);

      // wanted fallback
      if(wantedId === id){
        wantedId = market.list[0]?.id || null;
        saveJSON(LS.WANTED, wantedId);
      }

      // refresh index
      updateIndex();
      saveJSON(LS.MARKET, market);
      saveJSON(LS.PORT, portfolio);

      // refresh edit select
      market._refreshEditSelect && market._refreshEditSelect();

      renderAll();
      closeModal();
    });
  }

  function sanitizeId(s){
    return String(s || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
  }
  function parseArcs(s){
    if(!s.trim()) return [];
    return s.split(",")
      .map(x => clamp(num(x.trim(), -999), -999, 999))
      .filter(x => Number.isFinite(x) && x >= 0);
  }

  /***********************
   * BUY MULTIPLE QoL
   ***********************/
  function getQty(){
    const el = $("#qtyInput");
    if(!el) return 1;
    return clamp(num(el.value, 1), 1, 999);
  }

  function buyMany(ids, qtyEach){
    if(!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);

    // buy in order, stop if money runs out
    for(const id of ids){
      const c = market.byId[id];
      if(!c) continue;
      const cost = c.points * qtyEach;
      if(portfolio.balance < cost) continue;
      buy(id, qtyEach);
    }
  }

  function sellMany(ids, qtyEach){
    if(!ids.length) return;
    qtyEach = clamp(num(qtyEach, 1), 1, 999);
    for(const id of ids){
      const pos = portfolio.positions?.[id];
      if(!pos || pos.shares <= 0) continue;
      sell(id, Math.min(qtyEach, pos.shares));
    }
  }

  /***********************
   * FIRST RENDER
   ***********************/
  renderAll();

  /***********************
   * RENDER CORE
   ***********************/
  function renderAll(){
    renderHeader();
    renderIndex();
    renderMovers();
    renderProjects();
    renderPortfolio();
    renderWanted();

    saveJSON(LS.MARKET, market);
    saveJSON(LS.PORT, portfolio);

    // bulk count
    const bulkCount = $("#bulkCount");
    if(bulkCount) bulkCount.textContent = String(picksSet.size);
  }

  function renderHeader(){
    safeText(dayEl, market.day);
    safeText(balanceEl, Math.floor(portfolio.balance));
    safeText(netWorthEl, Math.floor(calcNetWorth()));
  }

  /***********************
   * FILTER + SORT
   ***********************/
  function getFilteredSorted(){
    const q = (ui.search || "").trim().toLowerCase();
    const arc = ui.arc ?? "all";
    const type = ui.type ?? "all";

    let list = market.list.slice();

    if(arc !== "all"){
      const arcNum = num(arc, -999);
      list = list.filter(c => c.arcs.includes(arcNum));
    }
    if(type !== "all"){
      list = list.filter(c => c.type === type);
    }
    if(q){
      list = list.filter(c => {
        const hay = `${c.name} ${c.ticker} ${c.type}`.toLowerCase();
        return hay.includes(q);
      });
    }

    switch(ui.sort){
      case "pop_desc": list.sort((a,b)=> b.popularity - a.popularity); break;
      case "pop_asc": list.sort((a,b)=> a.popularity - b.popularity); break;
      case "oldest": list.sort((a,b)=> a.debutOrder - b.debutOrder); break;
      case "newest": list.sort((a,b)=> b.debutOrder - a.debutOrder); break;
      case "potential_desc": list.sort((a,b)=> b.potential - a.potential); break;
      case "potential_asc": list.sort((a,b)=> a.potential - b.potential); break;
      case "price_desc": list.sort((a,b)=> b.points - a.points); break;
      case "price_asc": list.sort((a,b)=> a.points - b.points); break;
    }

    return list;
  }

  /***********************
   * PROJECT CARDS + MULTI SELECT CHECKBOX
   ***********************/
  function renderProjects(){
    const list = getFilteredSorted();
    if(resultCount) safeText(resultCount, `${list.length} results`);
    if(!projectsGrid) return;

    projectsGrid.innerHTML = "";
    for(const c of list){
      const card = buildCard(c);
      projectsGrid.appendChild(card);

      const sparkCanvas = card.querySelector("canvas.cardSpark");
      drawLine(sparkCanvas, c.history, { grid:false, padding:10 });
    }
  }

  function buildCard(c){
    const owned = portfolio.positions[c.id]?.shares || 0;
    const delta = c.lastDelta || 0;

    const selected = picksSet.has(c.id);

    const el = document.createElement("div");
    el.className = "card" + (selected ? " selected" : "");
    el.innerHTML = `
      <div class="cardTop">
        <img class="cardImg" src="${getImage(c)}" alt="${escapeHtml(c.name)}">
        <div class="pickBox" title="Select for bulk buy/sell">
          <input type="checkbox" ${selected ? "checked" : ""} />
          <span>Select</span>
        </div>
      </div>

      <div class="cardDivider"></div>

      <div class="cardBody">
        <div class="cardRow">
          <div>
            <div class="cardName">${escapeHtml(c.name)}</div>
            <div class="cardPrice">${Math.floor(c.points)} <span style="font-size:12px;opacity:.7">PTS</span></div>
            <div class="cardOwned">Owned: <b>${owned}</b></div>
          </div>
          <div style="text-align:right">
            <div class="ticker">$${escapeHtml(c.ticker)}</div>
            <div class="delta ${delta>0?'good':delta<0?'bad':''}">Δ ${fmtDelta(delta)}</div>
          </div>
        </div>

        <canvas class="cardSpark" width="240" height="56"></canvas>

        <div class="cardBtns">
          <button class="btn buy" type="button">BUY</button>
          <button class="btn sell" type="button">SELL</button>
        </div>
      </div>
    `;

    // checkbox selection
    const cb = el.querySelector(".pickBox input");
    if(cb){
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        if(cb.checked) picksSet.add(c.id);
        else picksSet.delete(c.id);
        saveJSON(LS.PICKS, Array.from(picksSet));
        el.classList.toggle("selected", cb.checked);

        const bulkCount = $("#bulkCount");
        if(bulkCount) bulkCount.textContent = String(picksSet.size);
      });
    }

    const buyBtn = el.querySelector(".btn.buy");
    const sellBtn = el.querySelector(".btn.sell");
    if(buyBtn){
      buyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        buy(c.id, getQty());
      });
    }
    if(sellBtn){
      sellBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sell(c.id, getQty());
      });
    }

    // single click selects wanted
    el.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      // sync admin forms too
      if(editCharSelect){
        editCharSelect.value = c.id;
        editCharSelect.dispatchEvent(new Event("change"));
      }
    });

    // double click opens modal
    el.addEventListener("dblclick", () => openDetailModal(c.id));

    return el;
  }

  /***********************
   * WANTED PANEL
   ***********************/
  function renderWanted(){
    const c = wantedId ? market.byId[wantedId] : null;
    if(!c){
      if(wantedImg) wantedImg.src = placeholderImg("WANTED");
      safeText(wantedName, "—");
      safeText(wantedRole, "—");
      safeText(wantedPrice, "0");
      safeText(wantedOwned, "0");
      safeText(wantedPop, "0");
      safeText(wantedPot, "0");
      safeText(wantedCap, "1000");
      safeText(wantedFrozen, "LIVE");
      safeHref(wantedLinkBtn, "#");
      return;
    }

    if(wantedImg){
      wantedImg.src = getImage(c);
      wantedImg.alt = c.name;
    }

    safeText(wantedName, c.name);
    safeText(wantedRole, String(c.type || "npc").toUpperCase());
    safeText(wantedPrice, Math.floor(c.points));
    safeText(wantedOwned, portfolio.positions[c.id]?.shares || 0);
    safeText(wantedPop, c.popularity);
    safeText(wantedPot, c.potential);
    safeText(wantedCap, Math.floor(c.cap ?? 1000));
    safeText(wantedFrozen, c.frozen ? "FROZEN" : "LIVE");

    safeHref(wantedLinkBtn, getLink(c));
  }

  /***********************
   * PORTFOLIO
   ***********************/
  function renderPortfolio(){
    const positions = Object.entries(portfolio.positions || {})
      .filter(([,p]) => p && p.shares > 0)
      .map(([id,p]) => ({ id, ...p, c: market.byId[id] }))
      .filter(x => x.c);

    safeText(positionsCount, positions.length);

    const h = portfolio.netWorthHistory || [];
    const last = num(h[h.length - 1], calcNetWorth());
    const prev = h.length > 1 ? num(h[h.length - 2], last) : last;
    const d = Math.floor(last - prev);

    if(nwDeltaEl){
      nwDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      nwDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(netWorthChart, h.length ? h : [portfolio.balance], { grid:true, padding:14 });

    if(!portfolioList) return;
    portfolioList.innerHTML = positions.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No positions yet.</div>`;

    for(const p of positions){
      const row = document.createElement("div");
      row.className = "posRow";
      row.innerHTML = `
        <div>
          <div class="posName">${escapeHtml(p.c.name)}</div>
          <div class="posMeta">${p.shares} shares • Avg ${Math.floor(p.avgCost)} PTS</div>
        </div>
        <div class="posValue">${Math.floor(p.shares * p.c.points)} PTS</div>
      `;
      portfolioList.appendChild(row);
    }
  }

  function calcNetWorth(){
    const pos = portfolio.positions || {};
    let sum = num(portfolio.balance, 0);
    for(const [id, p] of Object.entries(pos)){
      if(!p || p.shares <= 0) continue;
      const c = market.byId[id];
      if(!c) continue;
      sum += p.shares * c.points;
    }
    return sum;
  }

  /***********************
   * INDEX + MOVERS
   ***********************/
  function renderIndex(){
    const idx = Math.floor(num(market.indexHistory?.[market.indexHistory.length - 1], 0));
    const prev = market.indexHistory && market.indexHistory.length > 1
      ? Math.floor(num(market.indexHistory[market.indexHistory.length - 2], idx))
      : idx;
    const d = idx - prev;

    safeText(indexEl, idx);
    if(indexDeltaEl){
      indexDeltaEl.textContent = d >= 0 ? `+${d}` : `${d}`;
      indexDeltaEl.style.color = d >= 0 ? "var(--good)" : "var(--bad)";
    }

    drawLine(indexChart, market.indexHistory || [idx], { grid:true, padding:16 });
  }

  function renderMovers(){
    const list = market.list.slice();
    list.sort((a,b) => (b.lastDelta || 0) - (a.lastDelta || 0));

    const gainers = list.slice(0, 6);
    const losers = list.slice(-6).reverse();

    if(gainersList) gainersList.innerHTML = "";
    if(losersList) losersList.innerHTML = "";

    for(const c of gainers) gainersList && gainersList.appendChild(buildMoverRow(c));
    for(const c of losers) losersList && losersList.appendChild(buildMoverRow(c));
  }

  function buildMoverRow(c){
    const row = document.createElement("div");
    row.className = "watchRow";

    const delta = c.lastDelta || 0;
    row.innerHTML = `
      <div class="watchName">${escapeHtml(shortName(c.name))}</div>
      <div class="watchDelta ${delta>0?'good':delta<0?'bad':''}">
        ${fmtDelta(delta)}
      </div>
    `;

    row.addEventListener("click", () => {
      wantedId = c.id;
      saveJSON(LS.WANTED, wantedId);
      renderWanted();

      if(editCharSelect){
        editCharSelect.value = c.id;
        editCharSelect.dispatchEvent(new Event("change"));
      }
    });

    row.addEventListener("dblclick", () => openDetailModal(c.id));
    return row;
  }

  function shortName(s){
    const str = String(s || "");
    return str.length <= 16 ? str : (str.slice(0, 15) + "…");
  }

  function fmtDelta(n){
    const v = Math.round(num(n, 0));
    return v > 0 ? `+${v}` : `${v}`;
  }

  /***********************
   * SIMULATION (respects: frozen, cap, volMult, globalVol)
   ***********************/
  function startSim(){
    if(simTimer) return;
    const speed = clamp(num(ui.speedMs, 500), 60, 5000);
    simTimer = setInterval(() => tickN(1), speed);
  }

  function stopSim(){
    if(!simTimer) return;
    clearInterval(simTimer);
    simTimer = null;
  }

  function tickN(n){
    n = clamp(num(n, 1), 1, 999);
    for(let i=0;i<n;i++){
      marketTick();
      updateIndex();
      updateNetWorthHistory();
    }
    saveJSON(LS.MARKET, market);
    saveJSON(LS.PORT, portfolio);
    renderAll();
    if(selectedId) openDetailModal(selectedId);
  }

  function marketTick(){
    market.day = num(market.day, 0) + 1;

    // surge types more often
    const r = Math.random();
    let eventType = null;
    if(r < 0.10) eventType = "zodiac";
    else if(r < 0.18) eventType = "neo";
    else if(r < 0.26) eventType = "maji";

    const gVol = clamp(num(loadJSON("gb_global_vol_v10", 1), 1), 0.1, 10);

    for(const c of market.list){
      const cap = clamp(num(c.cap, 1000), 1, 1000);

      // stagnate/freeze = no movement
      if(c.frozen){
        c.lastDelta = 0;
        c.points = clamp(num(c.points, 300), 1, cap);
        c.history.push(c.points);
        if(c.history.length > MAX_HISTORY) c.history.shift();
        c.ticks.push({ label: "Frozen", delta: 0 });
        if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
        continue;
      }

      const volMult = clamp(num(c.volMult, 1), 0.1, 10);

      // volatility: bigger swings overall
      const vol = (1.25 + (1000 - c.popularity) / 220) * gVol * volMult;
      const bias = (c.potential - 500) / 180;

      const noise = randFloat(-14, 14) * vol;
      let eventPush = 0;
      if(eventType && c.type === eventType) eventPush = randFloat(6, 18) * volMult;

      const delta = clamp(Math.round(noise + bias + eventPush), -42, 42);

      const old = c.points;
      c.points = clamp(num(c.points, 300) + delta, 1, cap);
      c.lastDelta = c.points - old;

      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();

      c.ticks.push({ label: eventType ? `Tick (${eventType} surge)` : "Tick", delta: c.lastDelta });
      if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
    }
  }

  function updateIndex(){
    const avg = market.list.reduce((s,c)=> s + c.points, 0) / Math.max(1, market.list.length);
    market.indexHistory = market.indexHistory || [];
    market.indexHistory.push(avg);
    if(market.indexHistory.length > MAX_HISTORY) market.indexHistory.shift();
  }

  function updateNetWorthHistory(){
    portfolio.netWorthHistory = portfolio.netWorthHistory || [];
    portfolio.netWorthHistory.push(calcNetWorth());
    if(portfolio.netWorthHistory.length > MAX_HISTORY) portfolio.netWorthHistory.shift();
  }

  function randFloat(a,b){ return Math.random()*(b-a)+a; }

  /***********************
   * TRADING (respects cap; bumps don't move frozen stocks)
   ***********************/
  function buy(id, shares){
    const c = market.byId[id];
    if(!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const cost = c.points * shares;
    if(portfolio.balance < cost) return;

    portfolio.balance -= cost;

    const pos = portfolio.positions[id] || { shares: 0, avgCost: 0 };
    const newShares = pos.shares + shares;
    pos.avgCost = ((pos.avgCost * pos.shares) + cost) / newShares;
    pos.shares = newShares;
    portfolio.positions[id] = pos;

    bumpPrice(id, +Math.max(1, Math.round(shares * 3)));
    updateIndex();
    updateNetWorthHistory();
  }

  function sell(id, shares){
    const c = market.byId[id];
    if(!c) return;

    shares = clamp(num(shares, 1), 1, 999);
    const pos = portfolio.positions[id];
    if(!pos || pos.shares < shares) return;

    const revenue = c.points * shares;
    portfolio.balance += revenue;

    pos.shares -= shares;
    if(pos.shares <= 0) delete portfolio.positions[id];

    bumpPrice(id, -Math.max(1, Math.round(shares * 3)));
    updateIndex();
    updateNetWorthHistory();
  }

  function bumpPrice(id, amount){
    const c = market.byId[id];
    if(!c) return;

    const cap = clamp(num(c.cap, 1000), 1, 1000);

    // stagnate = no bump
    if(c.frozen){
      c.lastDelta = 0;
      c.points = clamp(num(c.points, 300), 1, cap);
      c.history.push(c.points);
      if(c.history.length > MAX_HISTORY) c.history.shift();
      c.ticks.push({ label: "Frozen trade", delta: 0 });
      if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
      return;
    }

    const old = c.points;
    c.points = clamp(num(c.points, 300) + num(amount, 0), 1, cap);
    c.lastDelta = c.points - old;

    c.history.push(c.points);
    if(c.history.length > MAX_HISTORY) c.history.shift();

    c.ticks.push({ label: amount >= 0 ? "Trade demand" : "Trade supply", delta: c.lastDelta });
    if(c.ticks.length > MAX_HISTORY) c.ticks.shift();
  }

  /***********************
   * MODAL
   ***********************/
  function openDetailModal(id){
    const c = market.byId[id];
    if(!c) return;
    selectedId = id;

    safeText(modalName, c.name);
    safeText(modalMeta, `${String(c.type).toUpperCase()} • Arcs: ${c.arcs.join(", ")} • $${c.ticker}`);

    if(modalImg){
      modalImg.src = getImage(c);
      modalImg.alt = c.name;
    }
    safeHref(modalLinkBtn, getLink(c));

    safeText(modalPrice, Math.floor(c.points));
    safeText(modalOwned, portfolio.positions[id]?.shares || 0);
    safeText(modalPotential, c.potential);
    safeText(modalPop, c.popularity);
    safeText(modalCap, Math.floor(c.cap ?? 1000));
    safeText(modalFrozen, c.frozen ? "FROZEN" : "LIVE");

    if(modalBuyBtn) modalBuyBtn.onclick = () => buy(id, getQty());
    if(modalSellBtn) modalSellBtn.onclick = () => sell(id, getQty());

    drawLine(spark, c.history, { grid:true, padding:16 });
    renderHistoryList(c);

    if(modalBackdrop) modalBackdrop.classList.remove("hidden");
    if(detailModal) detailModal.classList.remove("hidden");

    // sync admin when modal opened
    if(editCharSelect){
      editCharSelect.value = id;
      editCharSelect.dispatchEvent(new Event("change"));
    }
  }

  function closeModal(){
    selectedId = null;
    if(modalBackdrop) modalBackdrop.classList.add("hidden");
    if(detailModal) detailModal.classList.add("hidden");
  }

  function renderHistoryList(c){
    if(!historyList) return;
    const recent = (c.ticks || []).slice(-14).reverse();

    historyList.innerHTML = recent.length
      ? ""
      : `<div style="color:var(--muted);font-size:12px;">No ticks yet.</div>`;

    for(const t of recent){
      const d = num(t.delta, 0);
      const row = document.createElement("div");
      row.className = "hRow";
      row.innerHTML = `
        <div>${escapeHtml(t.label || "Tick")}</div>
        <div class="watchDelta ${d>0?'good':d<0?'bad':''}">${fmtDelta(d)} PTS</div>
      `;
      historyList.appendChild(row);
    }
  }

  /***********************
   * MEDIA LOOKUP (global entityMedia + local overrides)
   ***********************/
  function getImage(c){
    try{
      const o = mediaOverrides?.[c.id];
      if(o && typeof o.image === "string" && o.image.trim()) return o.image.trim();

      const m = entityMedia?.[c.id];
      if(m && typeof m.image === "string" && m.image.trim()) return m.image.trim();
    }catch(e){
      showFatal("media error in getImage(): " + (e?.message || e));
    }
    return placeholderImg(c.name);
  }

  function getLink(c){
    try{
      const o = mediaOverrides?.[c.id];
      if(o && typeof o.link === "string" && o.link.trim()) return o.link.trim();

      const m = entityMedia?.[c.id];
      if(m && typeof m.link === "string" && m.link.trim()) return m.link.trim();
    }catch(e){
      showFatal("media error in getLink(): " + (e?.message || e));
    }
    return "#";
  }

  /***********************
   * STORAGE UTIL
   ***********************/
  function loadJSON(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    }catch{
      return fallback;
    }
  }
  function saveJSON(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }catch{}
  }
  function persistUI(){
    saveJSON(LS.UI, {
      arc: ui.arc ?? "all",
      type: ui.type ?? "all",
      sort: ui.sort ?? "pop_desc",
      search: ui.search ?? "",
      speedMs: clamp(num(ui.speedMs, 500), 60, 5000)
    });
  }

  /***********************
   * MARKET INIT / VALIDATION
   ***********************/
  function tickerFrom(c){
    const base = (c.id || c.name || "GBX").replace(/[^a-z0-9]/gi, "").toUpperCase();
    return (base.slice(0, 3) || "GBX");
  }

  function seedHistory(start){
    const arr = [start];
    for(let i=0;i<24;i++){
      const prev = arr[arr.length - 1];
      arr.push(clamp(prev + Math.round(randFloat(-18, 18)), 1, 1000));
    }
    return arr;
  }

  function avgPoints(list){
    return list.reduce((s,c)=> s + num(c.points, 0), 0) / Math.max(1, list.length);
  }

  function initMarket(){
    const list = BASE_CHARACTERS.map((c) => {
      const seed = clamp(num(c.points, 300), 1, 1000);
      return {
        ...c,
        points: clamp(seed, 1, clamp(num(c.cap, 1000), 1, 1000)),
        lastDelta: 0,
        ticker: tickerFrom(c),
        cap: clamp(num(c.cap, 1000), 1, 1000),
        frozen: Boolean(c.frozen),
        volMult: clamp(num(c.volMult, 1), 0.1, 10),
        history: seedHistory(seed),
        ticks: []
      };
    });

    const byId = Object.fromEntries(list.map(c => [c.id, c]));
    return {
      list,
      byId,
      day: 0,
      indexHistory: [avgPoints(list)]
    };
  }

  function validateOrInitMarket(m){
    if(!m || !Array.isArray(m.list)) return initMarket();

    if(!m.byId || typeof m.byId !== "object"){
      m.byId = Object.fromEntries(m.list.map(c => [c.id, c]));
    }

    const seen = new Set(m.list.map(c => c.id));
    for(const base of BASE_CHARACTERS){
      if(!seen.has(base.id)){
        const seed = clamp(num(base.points, 300), 1, 1000);
        const fresh = {
          ...base,
          points: seed,
          lastDelta: 0,
          ticker: tickerFrom(base),
          cap: clamp(num(base.cap, 1000), 1, 1000),
          frozen: Boolean(base.frozen),
          volMult: clamp(num(base.volMult, 1), 0.1, 10),
          history: seedHistory(seed),
          ticks: []
        };
        m.list.push(fresh);
        m.byId[fresh.id] = fresh;
      }
    }

    m.day = clamp(num(m.day, 0), 0, 9e9);
    m.indexHistory = Array.isArray(m.indexHistory) ? m.indexHistory.slice(-MAX_HISTORY) : [avgPoints(m.list)];

    for(const c of m.list){
      c.cap = clamp(num(c.cap, 1000), 1, 1000);
      c.points = clamp(num(c.points, 300), 1, c.cap);
      c.popularity = clamp(num(c.popularity, 500), 1, 1000);
      c.potential = clamp(num(c.potential, 500), 1, 1000);
      c.ticker = c.ticker || tickerFrom(c);
      c.history = Array.isArray(c.history) ? c.history.slice(-MAX_HISTORY) : seedHistory(c.points);
      c.ticks = Array.isArray(c.ticks) ? c.ticks.slice(-MAX_HISTORY) : [];
      c.lastDelta = num(c.lastDelta, 0);
      c.frozen = Boolean(c.frozen);
      c.volMult = clamp(num(c.volMult, 1), 0.1, 10);
      if(!Array.isArray(c.arcs)) c.arcs = [];
      if(typeof c.name !== "string") c.name = String(c.name || c.id);
      if(typeof c.type !== "string") c.type = "npc";
      if(!Number.isFinite(c.debutOrder)) c.debutOrder = 9999;
      m.byId[c.id] = c;
    }

    return m;
  }

  function validateOrInitPortfolio(p){
    if(!p || typeof p !== "object"){
      return { balance: 5000, positions: {}, netWorthHistory: [5000] };
    }
    p.balance = clamp(num(p.balance, 5000), 0, 9e12);
    p.positions = (p.positions && typeof p.positions === "object") ? p.positions : {};
    p.netWorthHistory = Array.isArray(p.netWorthHistory) ? p.netWorthHistory.slice(-MAX_HISTORY) : [p.balance];

    for(const [id, pos] of Object.entries(p.positions)){
      if(!pos || typeof pos !== "object"){ delete p.positions[id]; continue; }
      pos.shares = clamp(num(pos.shares, 0), 0, 9e9);
      pos.avgCost = clamp(num(pos.avgCost, 0), 0, 1000);
      if(pos.shares <= 0) delete p.positions[id];
    }
    return p;
  }

  function applyAdminStateToMarket(){
    if(!adminState || typeof adminState !== "object") return;
    for(const [id, st] of Object.entries(adminState)){
      const c = market.byId[id];
      if(!c || !st || typeof st !== "object") continue;
      if(st.cap != null) c.cap = clamp(num(st.cap, c.cap ?? 1000), 1, 1000);
      if(st.frozen != null) c.frozen = Boolean(st.frozen);
      if(st.volMult != null) c.volMult = clamp(num(st.volMult, c.volMult ?? 1), 0.1, 10);
      c.points = clamp(num(c.points, 300), 1, c.cap);
    }
  }

  /***********************
   * CANVAS LINE CHART
   ***********************/
  function tryGet2D(canvas){
    if(!canvas) return null;
    try{ return canvas.getContext("2d"); }catch{ return null; }
  }

  function drawLine(canvas, series, opts = {}){
    if(!canvas) return;
    const ctx = tryGet2D(canvas);
    if(!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = num(opts.padding, 16);
    const showGrid = opts.grid !== false;

    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "rgba(0,0,0,.08)";
    ctx.fillRect(0,0,w,h);

    if(!Array.isArray(series) || series.length < 2) return;

    const values = series.map(v => num(v, 0));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = Math.max(1e-6, max - min);

    if(showGrid){
      ctx.strokeStyle = "rgba(255,255,255,.06)";
      ctx.lineWidth = 1;
      for(let i=1;i<=4;i++){
        const y = (h/5)*i;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "rgba(236,245,255,.92)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for(let i=0;i<values.length;i++){
      const x = padding + (i*(w - padding*2))/(values.length - 1);
      const y = (h - padding) - ((values[i]-min)/span)*(h - padding*2);
      if(i===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
})();
