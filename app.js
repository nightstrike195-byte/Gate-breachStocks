/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) SAFETY HELPERS
   *****************************************************************/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const toInt = (v, d = 0) => {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) ? n : d;
  };
  const toNum = (v, d = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  };
  const fmt = (n) => Math.round(Number(n) || 0).toLocaleString();

  const safeUrl = (u) => {
    if (!u) return "";
    try {
      const url = new URL(String(u), location.href);
      if (!/^https?:$/.test(url.protocol)) return "";
      return url.href;
    } catch {
      return "";
    }
  };

  /*****************************************************************
   * 1) ADMIN PANEL PASSWORD LOCK (CHANGE THIS PASSWORD)
   *****************************************************************/
  const EDIT_PANEL_PASSWORD = "Raijin is a bitch"; // <-- CHANGE THIS
  const EDIT_AUTH_KEY = "gb_edit_authed_v1";

  function isEditAuthed() {
    try {
      return sessionStorage.getItem(EDIT_AUTH_KEY) === "1";
    } catch {
      return false;
    }
  }
  function setEditAuthed(v) {
    try {
      sessionStorage.setItem(EDIT_AUTH_KEY, v ? "1" : "0");
    } catch {}
  }

  /*****************************************************************
   * 2) PASTE YOUR entityMedia HERE (TOP LEVEL, NOT INSIDE ANYTHING)
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

  /*****************************************************************
   * 3) CHARACTERS (YOUR LIST)
   *****************************************************************/
  function mk(id, name, type, folders, code, floor, cap, volatility) {
    return {
      id: String(id),
      name: String(name),
      type: String(type),
      folders: Array.isArray(folders) ? folders.slice() : [],
      code: toInt(code, 0),
      floor: toInt(floor, 0),
      cap: toInt(cap, 0),
      volatility: toInt(volatility, 0),
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

  /*****************************************************************
   * 4) STORAGE
   *****************************************************************/
  const KEY_STATE = "gbx_state_v4";
  const KEY_OVERRIDES = "gbx_overrides_v2";
  const KEY_CUSTOM_CHARS = "gbx_custom_chars_v1";

  const loadJSON = (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      if (!v) return fallback;
      const obj = JSON.parse(v);
      return obj ?? fallback;
    } catch {
      return fallback;
    }
  };
  const saveJSON = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch {
      return false;
    }
  };

  /*****************************************************************
   * 5) APP STATE
   *****************************************************************/
  const PORT_KEYS = ["J", "M", "B", "K", "R"];

  function defaultState() {
    const portfolios = {};
    for (const p of PORT_KEYS) {
      portfolios[p] = { points: 5000, holdings: {} };
    }
    return {
      activePortfolio: "J",
      portfolios,
      prices: {},       // current prices by id
      lastDelta: {},    // last tick delta by id
      globalStagnant: false, // stagnate ALL stocks
      tickMs: 2500,
    };
  }

  let state = (() => {
    const s = loadJSON(KEY_STATE, null);
    if (!s || typeof s !== "object") return defaultState();
    const base = defaultState();
    // merge safely
    base.activePortfolio = PORT_KEYS.includes(s.activePortfolio) ? s.activePortfolio : base.activePortfolio;
    base.globalStagnant = !!s.globalStagnant;
    base.tickMs = toInt(s.tickMs, base.tickMs);
    base.prices = (s.prices && typeof s.prices === "object") ? s.prices : {};
    base.lastDelta = (s.lastDelta && typeof s.lastDelta === "object") ? s.lastDelta : {};
    base.portfolios = base.portfolios;
    if (s.portfolios && typeof s.portfolios === "object") {
      for (const p of PORT_KEYS) {
        if (s.portfolios[p]) {
          base.portfolios[p].points = toInt(s.portfolios[p].points, base.portfolios[p].points);
          base.portfolios[p].holdings = (s.portfolios[p].holdings && typeof s.portfolios[p].holdings === "object")
            ? s.portfolios[p].holdings
            : {};
        }
      }
    }
    return base;
  })();

  let overrides = loadJSON(KEY_OVERRIDES, {});
  if (!overrides || typeof overrides !== "object") overrides = {};

  let customChars = loadJSON(KEY_CUSTOM_CHARS, {});
  if (!customChars || typeof customChars !== "object") customChars = {};

  const persistState = () => saveJSON(KEY_STATE, state);
  const persistOverrides = () => saveJSON(KEY_OVERRIDES, overrides);
  const persistCustom = () => saveJSON(KEY_CUSTOM_CHARS, customChars);

  /*****************************************************************
   * 6) DATA: BUILD ACTIVE CHARACTER LIST
   *****************************************************************/
  function normalizeChar(obj) {
    // accepts mk-like objects or stored custom objects
    const id = String(obj?.id ?? "").trim();
    if (!id) return null;
    const name = String(obj?.name ?? id);
    const type = String(obj?.type ?? "unknown");
    const folders = Array.isArray(obj?.folders) ? obj.folders.map((x) => toInt(x, 0)) : [];
    const code = toInt(obj?.code, 0);
    let floor = toInt(obj?.floor, 0);
    let cap = toInt(obj?.cap, 0);
    let volatility = toInt(obj?.volatility, 0);
    if (cap < floor) cap = floor;
    if (volatility < 0) volatility = 0;
    return { id, name, type, folders, code, floor, cap, volatility };
  }

  function getAllCharacters() {
    const map = new Map();

    // base
    for (const c of BASE_CHARACTERS) {
      const nc = normalizeChar(c);
      if (nc) map.set(nc.id, nc);
    }

    // custom (stored)
    for (const k of Object.keys(customChars)) {
      const nc = normalizeChar(customChars[k]);
      if (nc) map.set(nc.id, nc);
    }

    // apply overrides
    const out = [];
    for (const c of map.values()) {
      const o = overrides[c.id];
      const merged = { ...c };
      if (o && typeof o === "object") {
        if (Number.isFinite(+o.floor)) merged.floor = toInt(o.floor, merged.floor);
        if (Number.isFinite(+o.cap)) merged.cap = toInt(o.cap, merged.cap);
        if (Number.isFinite(+o.volatility)) merged.volatility = toInt(o.volatility, merged.volatility);
        if (merged.cap < merged.floor) merged.cap = merged.floor;
        if (merged.volatility < 0) merged.volatility = 0;
        merged.stagnant = !!o.stagnant;
      } else {
        merged.stagnant = false;
      }
      // ensure price exists
      if (!Number.isFinite(+state.prices[merged.id])) {
        state.prices[merged.id] = clamp(Math.round((merged.floor + merged.cap) / 2), merged.floor, merged.cap);
      } else {
        state.prices[merged.id] = clamp(toInt(state.prices[merged.id], merged.floor), merged.floor, merged.cap);
      }
      out.push(merged);
    }

    // cleanup prices/holdings for removed chars (safe)
    const ids = new Set(out.map((x) => x.id));
    for (const pid of Object.keys(state.prices)) {
      if (!ids.has(pid)) delete state.prices[pid];
    }
    for (const p of PORT_KEYS) {
      const h = state.portfolios[p].holdings || {};
      for (const hid of Object.keys(h)) {
        if (!ids.has(hid)) delete h[hid];
        else h[hid] = Math.max(0, toInt(h[hid], 0));
      }
      state.portfolios[p].holdings = h;
    }

    persistState();
    return out.sort((a, b) => a.name.localeCompare(b.name));
  }

  /*****************************************************************
   * 7) UI: BUILD EVERYTHING (NO HTML CHANGES REQUIRED)
   *****************************************************************/
  const APP_ID = "gbxApp_v1";

  function ensureStyles() {
    if ($("#gbxStyles")) return;
    const style = document.createElement("style");
    style.id = "gbxStyles";
    style.textContent = `
#${APP_ID}{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:1100px;margin:16px auto;padding:14px;}
#${APP_ID} .topbar{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:10px;}
#${APP_ID} .brand{font-weight:800;letter-spacing:.5px}
#${APP_ID} .tabs{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 14px;}
#${APP_ID} .tabbtn{border:1px solid rgba(0,0,0,.2);background:rgba(0,0,0,.03);padding:8px 10px;border-radius:12px;cursor:pointer}
#${APP_ID} .tabbtn[aria-selected="true"]{background:rgba(0,0,0,.10);font-weight:700}
#${APP_ID} .panel{display:none}
#${APP_ID} .panel.active{display:block}
#${APP_ID} .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#${APP_ID} .card{border:1px solid rgba(0,0,0,.18);border-radius:16px;padding:12px;background:#fff}
#${APP_ID} .muted{opacity:.75}
#${APP_ID} input, #${APP_ID} select, #${APP_ID} button{font:inherit}
#${APP_ID} input, #${APP_ID} select{border:1px solid rgba(0,0,0,.2);border-radius:12px;padding:8px 10px}
#${APP_ID} button{border:1px solid rgba(0,0,0,.2);border-radius:12px;padding:8px 10px;background:rgba(0,0,0,.05);cursor:pointer}
#${APP_ID} button:hover{filter:brightness(.98)}
#${APP_ID} .pill{display:inline-flex;gap:6px;align-items:center;border:1px solid rgba(0,0,0,.15);border-radius:999px;padding:6px 10px;background:rgba(0,0,0,.03)}
#${APP_ID} .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
@media (max-width: 900px){#${APP_ID} .grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width: 620px){#${APP_ID} .grid{grid-template-columns:1fr;}}
#${APP_ID} .stockRow{display:grid;grid-template-columns:48px 1.2fr .7fr .7fr 1fr;gap:10px;align-items:center;padding:10px;border-bottom:1px solid rgba(0,0,0,.08)}
#${APP_ID} .stockRow:last-child{border-bottom:none}
#${APP_ID} .avatar{width:46px;height:46px;border-radius:14px;object-fit:cover;background:rgba(0,0,0,.06)}
#${APP_ID} .deltaUp{font-weight:800}
#${APP_ID} .deltaDown{font-weight:800}
#${APP_ID} .right{justify-self:end}
#${APP_ID} .mini{font-size:12px}
#${APP_ID} .danger{border-color:rgba(220,0,0,.45)}
#${APP_ID} .ok{border-color:rgba(0,140,0,.35)}
`;
    document.head.appendChild(style);
  }

  function ensureRoot() {
    ensureStyles();
    let root = document.getElementById(APP_ID);
    if (root) return root;

    // try to mount inside an existing container if present
    root = document.createElement("div");
    root.id = APP_ID;

    const host = document.querySelector("#app, main, body");
    host.appendChild(root);
    return root;
  }

  function mediaFor(id) {
    const m = entityMedia && entityMedia[id] ? entityMedia[id] : null;
    return {
      image: safeUrl(m?.image || ""),
      link: safeUrl(m?.link || "")
    };
  }

  function setActiveTab(tab) {
    $$(".panel", ui.root).forEach((p) => p.classList.toggle("active", p.dataset.tab === tab));
    $$(".tabbtn", ui.root).forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab ? "true" : "false"));
    if (tab === "admin") {
      renderAdmin(); // re-check auth each time
    }
  }

  const ui = {
    root: null,
    panels: {},
    stockRows: new Map(), // id -> row elements
  };

  function buildUI() {
    const root = ensureRoot();
    ui.root = root;

    root.innerHTML = `
      <div class="topbar">
        <div class="brand">GATE//BREACH — Exchange</div>
        <div class="row">
          <span class="pill" id="gbxPortPill"></span>
          <span class="pill" id="gbxPointsPill"></span>
          <button id="gbxSaveBtn" title="Save">Save</button>
        </div>
      </div>

      <div class="tabs">
        <button class="tabbtn" data-tab="market" aria-selected="true">Market</button>
        <button class="tabbtn" data-tab="portfolio" aria-selected="false">Portfolios</button>
        <button class="tabbtn" data-tab="characters" aria-selected="false">Characters</button>
        <button class="tabbtn" data-tab="admin" aria-selected="false">Admin</button>
      </div>

      <div class="panel active" data-tab="market">
        <div class="card" style="margin-bottom:10px">
          <div class="row" style="justify-content:space-between">
            <div class="row">
              <span class="pill">Active Portfolio:
                <select id="gbxActivePort"></select>
              </span>
              <span class="pill">Search:
                <input id="gbxSearch" type="text" placeholder="name / id / type" />
              </span>
              <span class="pill">Market:
                <button id="gbxToggleGlobalFreeze"></button>
              </span>
            </div>
            <div class="muted mini">Buy/Sell uses the current price.</div>
          </div>
        </div>

        <div class="card" id="gbxMarketList"></div>
      </div>

      <div class="panel" data-tab="portfolio">
        <div class="card" style="margin-bottom:10px">
          <div class="row" style="justify-content:space-between">
            <div class="row">
              <span class="pill">Portfolio:
                <select id="gbxPortSelect"></select>
              </span>
              <button id="gbxPortSetActive">Set Active</button>
            </div>
            <div class="row">
              <span class="pill" id="gbxPortPoints"></span>
              <button id="gbxSellAll">Sell ALL Holdings</button>
            </div>
          </div>
        </div>
        <div class="card" id="gbxHoldings"></div>
      </div>

      <div class="panel" data-tab="characters">
        <div class="card" style="margin-bottom:10px">
          <div class="row" style="justify-content:space-between">
            <div class="row">
              <span class="pill">Search:
                <input id="gbxCharSearch" type="text" placeholder="name / id / type" />
              </span>
            </div>
            <div class="muted mini">Click an image/name to open the link (if you set one).</div>
          </div>
        </div>
        <div class="grid" id="gbxCharGrid"></div>
      </div>

      <div class="panel" data-tab="admin">
        <div id="gbxAdminWrap"></div>
      </div>
    `;

    // wire tabs
    $$(".tabbtn", root).forEach((b) => {
      b.addEventListener("click", () => setActiveTab(b.dataset.tab));
    });

    $("#gbxSaveBtn", root).addEventListener("click", () => {
      persistState();
      persistOverrides();
      persistCustom();
      flashPill("Saved.");
    });

    // portfolio select dropdowns
    const activeSel = $("#gbxActivePort", root);
    const portSel = $("#gbxPortSelect", root);
    for (const p of PORT_KEYS) {
      const o1 = document.createElement("option");
      o1.value = p; o1.textContent = p;
      activeSel.appendChild(o1);

      const o2 = document.createElement("option");
      o2.value = p; o2.textContent = p;
      portSel.appendChild(o2);
    }
    activeSel.value = state.activePortfolio;
    portSel.value = state.activePortfolio;

    activeSel.addEventListener("change", () => {
      state.activePortfolio = activeSel.value;
      persistState();
      renderHeader();
      renderHoldings();
      renderMarket(); // updates points shown
    });

    $("#gbxPortSetActive", root).addEventListener("click", () => {
      state.activePortfolio = portSel.value;
      $("#gbxActivePort", root).value = state.activePortfolio;
      persistState();
      renderHeader();
      renderHoldings();
      renderMarket();
      flashPill(`Active portfolio: ${state.activePortfolio}`);
    });

    $("#gbxSellAll", root).addEventListener("click", () => {
      const chars = getAllCharacters();
      const port = state.portfolios[state.activePortfolio];
      const holdings = port.holdings || {};
      for (const id of Object.keys(holdings)) {
        const qty = toInt(holdings[id], 0);
        if (qty <= 0) continue;
        const price = toInt(state.prices[id], 0);
        port.points += qty * price;
        holdings[id] = 0;
      }
      port.holdings = holdings;
      persistState();
      renderHeader();
      renderHoldings();
      renderMarket(chars);
      flashPill("Sold all holdings.");
    });

    $("#gbxSearch", root).addEventListener("input", () => renderMarket());
    $("#gbxCharSearch", root).addEventListener("input", () => renderCharacters());

    $("#gbxToggleGlobalFreeze", root).addEventListener("click", () => {
      state.globalStagnant = !state.globalStagnant;
      persistState();
      renderHeader();
      renderMarket();
      renderAdmin(); // keep in sync
    });

    renderHeader();
    renderMarket();
    renderHoldings();
    renderCharacters();
    renderAdmin();
  }

  function flashPill(msg) {
    const el = $("#gbxPointsPill", ui.root);
    const old = el.textContent;
    el.textContent = msg;
    setTimeout(() => renderHeader(), 900);
  }

  function renderHeader() {
    const p = state.activePortfolio;
    const port = state.portfolios[p];
    $("#gbxPortPill", ui.root).textContent = `Portfolio: ${p}`;
    $("#gbxPointsPill", ui.root).textContent = `Points: ${fmt(port?.points ?? 0)}`;
    $("#gbxToggleGlobalFreeze", ui.root).textContent = state.globalStagnant ? "UNFREEZE Market" : "FREEZE Market";
    $("#gbxToggleGlobalFreeze", ui.root).classList.toggle("danger", state.globalStagnant);
    $("#gbxToggleGlobalFreeze", ui.root).classList.toggle("ok", !state.globalStagnant);
    $("#gbxPortPoints", ui.root).textContent = `Points: ${fmt(state.portfolios[$("#gbxPortSelect", ui.root).value]?.points ?? 0)}`;
  }

  /*****************************************************************
   * 8) MARKET UI (BUY/SELL + LIVE PRICES)
   *****************************************************************/
  function getDeltaClass(delta) {
    if (delta > 0) return "deltaUp";
    if (delta < 0) return "deltaDown";
    return "";
  }
  function deltaText(delta) {
    if (!delta) return "0";
    return (delta > 0 ? "+" : "") + fmt(delta);
  }

  function renderMarket(providedChars) {
    const chars = providedChars || getAllCharacters();
    const q = ($("#gbxSearch", ui.root)?.value || "").trim().toLowerCase();
    const list = q
      ? chars.filter((c) =>
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
        )
      : chars;

    const host = $("#gbxMarketList", ui.root);
    ui.stockRows.clear();

    host.innerHTML = `
      <div class="stockRow muted mini" style="font-weight:700">
        <div></div>
        <div>Stock</div>
        <div>Price / Δ</div>
        <div>Floor / Cap</div>
        <div class="right">Trade</div>
      </div>
      <div id="gbxRows"></div>
    `;

    const rows = $("#gbxRows", host);
    for (const c of list) {
      const m = mediaFor(c.id);
      const price = toInt(state.prices[c.id], clamp(Math.round((c.floor + c.cap) / 2), c.floor, c.cap));
      const delta = toInt(state.lastDelta[c.id], 0);

      const row = document.createElement("div");
      row.className = "stockRow";
      row.dataset.id = c.id;

      row.innerHTML = `
        <div>
          ${
            m.image
              ? `<img class="avatar" src="${m.image}" alt="${c.name}">`
              : `<div class="avatar" title="${c.id}" style="display:flex;align-items:center;justify-content:center;font-weight:800">${c.name.slice(0,1).toUpperCase()}</div>`
          }
        </div>

        <div>
          <div style="font-weight:800;line-height:1.1">
            ${m.link ? `<a href="${m.link}" target="_blank" rel="noopener">${c.name}</a>` : c.name}
            ${c.stagnant ? `<span class="pill mini danger" style="margin-left:6px">STAGNANT</span>` : ``}
          </div>
          <div class="muted mini">${c.id} • ${c.type}</div>
        </div>

        <div>
          <div style="font-weight:900">${fmt(price)}</div>
          <div class="${getDeltaClass(delta)} mini">${deltaText(delta)}</div>
        </div>

        <div class="mini">
          <div>Floor: ${fmt(c.floor)}</div>
          <div>Cap: ${fmt(c.cap)}</div>
        </div>

        <div class="right">
          <div class="row" style="justify-content:flex-end">
            <input type="number" min="1" step="1" value="1" style="width:88px" class="qty">
            <button class="buy">Buy</button>
            <button class="sell">Sell</button>
          </div>
          <div class="muted mini" style="text-align:right;margin-top:4px">Hold: <span class="hold">0</span></div>
        </div>
      `;

      rows.appendChild(row);

      const qtyEl = $(".qty", row);
      const buyBtn = $(".buy", row);
      const sellBtn = $(".sell", row);
      const holdEl = $(".hold", row);

      const refreshHold = () => {
        const port = state.portfolios[state.activePortfolio];
        const qty = toInt(port?.holdings?.[c.id], 0);
        holdEl.textContent = fmt(qty);
      };
      refreshHold();

      buyBtn.addEventListener("click", () => {
        const qty = Math.max(1, toInt(qtyEl.value, 1));
        doBuy(c.id, qty);
      });
      sellBtn.addEventListener("click", () => {
        const qty = Math.max(1, toInt(qtyEl.value, 1));
        doSell(c.id, qty);
      });

      ui.stockRows.set(c.id, { row, refreshHold });
    }

    renderHeader();
    // update holdings numbers after render
    for (const v of ui.stockRows.values()) v.refreshHold();
  }

  function doBuy(id, qty) {
    const port = state.portfolios[state.activePortfolio];
    const price = toInt(state.prices[id], 0);
    const cost = qty * price;
    if (cost <= 0) return;
    if ((port.points || 0) < cost) {
      flashPill("Not enough points.");
      return;
    }
    port.points -= cost;
    port.holdings[id] = toInt(port.holdings[id], 0) + qty;
    persistState();
    renderHeader();
    renderHoldings();
    if (ui.stockRows.get(id)) ui.stockRows.get(id).refreshHold();
  }

  function doSell(id, qty) {
    const port = state.portfolios[state.activePortfolio];
    const have = toInt(port.holdings[id], 0);
    if (have <= 0) return;
    const sellQty = Math.min(have, qty);
    const price = toInt(state.prices[id], 0);
    const gain = sellQty * price;
    port.points += gain;
    port.holdings[id] = have - sellQty;
    persistState();
    renderHeader();
    renderHoldings();
    if (ui.stockRows.get(id)) ui.stockRows.get(id).refreshHold();
  }

  /*****************************************************************
   * 9) PORTFOLIO UI
   *****************************************************************/
  function renderHoldings() {
    const chars = getAllCharacters();
    const byId = new Map(chars.map((c) => [c.id, c]));
    const pKey = $("#gbxPortSelect", ui.root).value || state.activePortfolio;
    $("#gbxPortPoints", ui.root).textContent = `Points: ${fmt(state.portfolios[pKey]?.points ?? 0)}`;

    const port = state.portfolios[pKey];
    const holdings = port?.holdings || {};
    const rows = [];

    for (const id of Object.keys(holdings)) {
      const qty = toInt(holdings[id], 0);
      if (qty <= 0) continue;
      const c = byId.get(id);
      const price = toInt(state.prices[id], 0);
      rows.push({
        id,
        name: c?.name || id,
        qty,
        price,
        value: qty * price
      });
    }

    rows.sort((a, b) => b.value - a.value);

    const host = $("#gbxHoldings", ui.root);
    if (rows.length === 0) {
      host.innerHTML = `<div class="muted">No holdings in this portfolio.</div>`;
      return;
    }

    host.innerHTML = `
      <div class="stockRow muted mini" style="font-weight:700">
        <div></div>
        <div>Holding</div>
        <div>Qty</div>
        <div>Price</div>
        <div class="right">Value</div>
      </div>
      <div id="gbxHoldRows"></div>
    `;

    const wrap = $("#gbxHoldRows", host);
    for (const r of rows) {
      const c = byId.get(r.id);
      const m = mediaFor(r.id);

      const row = document.createElement("div");
      row.className = "stockRow";
      row.innerHTML = `
        <div>
          ${
            m.image
              ? `<img class="avatar" src="${m.image}" alt="${r.name}">`
              : `<div class="avatar" style="display:flex;align-items:center;justify-content:center;font-weight:800">${r.name.slice(0,1).toUpperCase()}</div>`
          }
        </div>
        <div>
          <div style="font-weight:800">${m.link ? `<a href="${m.link}" target="_blank" rel="noopener">${r.name}</a>` : r.name}</div>
          <div class="muted mini">${r.id} • ${(c?.type || "unknown")}</div>
        </div>
        <div style="font-weight:900">${fmt(r.qty)}</div>
        <div style="font-weight:900">${fmt(r.price)}</div>
        <div class="right" style="font-weight:900">${fmt(r.value)}</div>
      `;
      wrap.appendChild(row);
    }
  }

  /*****************************************************************
   * 10) CHARACTERS UI (CARDS)
   *****************************************************************/
  function renderCharacters() {
    const chars = getAllCharacters();
    const q = ($("#gbxCharSearch", ui.root)?.value || "").trim().toLowerCase();
    const list = q
      ? chars.filter((c) =>
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
        )
      : chars;

    const grid = $("#gbxCharGrid", ui.root);
    grid.innerHTML = "";

    for (const c of list) {
      const m = mediaFor(c.id);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="row" style="align-items:flex-start">
          <div>
            ${
              m.image
                ? `<img class="avatar" src="${m.image}" alt="${c.name}" style="width:76px;height:76px;border-radius:18px">`
                : `<div class="avatar" style="width:76px;height:76px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:28px">${c.name.slice(0,1).toUpperCase()}</div>`
            }
          </div>
          <div style="flex:1">
            <div style="font-weight:900;font-size:16px;line-height:1.2">
              ${m.link ? `<a href="${m.link}" target="_blank" rel="noopener">${c.name}</a>` : c.name}
            </div>
            <div class="muted mini">${c.id} • ${c.type}</div>
            <div class="mini" style="margin-top:8px">
              <div>Floor: ${fmt(c.floor)} • Cap: ${fmt(c.cap)} • Vol: ${fmt(c.volatility)}</div>
              <div>Price: <b>${fmt(state.prices[c.id])}</b></div>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }
  }

  /*****************************************************************
   * 11) ADMIN PANEL (LOCKED) — REQUIRED FEATURES
   *     - Stagnate stocks (per-stock + global)
   *     - Change volatility
   *     - Choose stock prices
   *     - Max cap the stock can reach
   *     - Give themselves as many points as they wish
   *     - Add/remove characters
   *****************************************************************/
  function renderAdmin() {
    const wrap = $("#gbxAdminWrap", ui.root);
    const authed = isEditAuthed();
    const chars = getAllCharacters();

    if (!authed) {
      wrap.innerHTML = `
        <div class="card">
          <div style="font-weight:900;font-size:18px;margin-bottom:6px">Admin Locked</div>
          <div class="muted" style="margin-bottom:10px">Enter password to unlock admin controls.</div>
          <div class="row">
            <input id="gbxAdminPw" type="password" placeholder="Password" style="min-width:240px">
            <button id="gbxAdminUnlock">Unlock</button>
            <button id="gbxAdminClearAuth" class="danger">Clear Auth</button>
          </div>
          <div class="muted mini" style="margin-top:8px">Password is defined at the top of app.js as EDIT_PANEL_PASSWORD.</div>
        </div>
      `;
      $("#gbxAdminUnlock", wrap).addEventListener("click", () => {
        const pw = $("#gbxAdminPw", wrap).value || "";
        if (pw === EDIT_PANEL_PASSWORD) {
          setEditAuthed(true);
          renderAdmin();
          flashPill("Admin unlocked.");
        } else {
          flashPill("Wrong password.");
        }
      });
      $("#gbxAdminClearAuth", wrap).addEventListener("click", () => {
        setEditAuthed(false);
        flashPill("Admin auth cleared.");
      });
      return;
    }

    // build admin UI
    wrap.innerHTML = `
      <div class="card" style="margin-bottom:10px">
        <div class="row" style="justify-content:space-between">
          <div>
            <div style="font-weight:900;font-size:18px;margin-bottom:4px">Admin Panel</div>
            <div class="muted mini">You can freeze market, set prices, volatility, cap, and edit points.</div>
          </div>
          <div class="row">
            <button id="gbxAdminLock">Lock</button>
          </div>
        </div>
      </div>

      <div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:10px">
        <div class="card">
          <div style="font-weight:900;margin-bottom:6px">Market Controls</div>
          <div class="row">
            <span class="pill">Global Stagnation:
              <button id="gbxAdminGlobalFreeze"></button>
            </span>
          </div>
          <div class="muted mini" style="margin-top:8px">This stops ALL automatic price movement.</div>
        </div>

        <div class="card">
          <div style="font-weight:900;margin-bottom:6px">Give Yourself Points</div>
          <div class="row">
            <select id="gbxAdminPointsPort"></select>
            <input id="gbxAdminPointsVal" type="number" step="1" placeholder="Points (any number)">
            <button id="gbxAdminSetPoints">Set Points</button>
          </div>
          <div class="muted mini" style="margin-top:8px">This sets the portfolio points exactly to what you enter.</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:10px">
        <div style="font-weight:900;margin-bottom:8px">Stock Editor</div>
        <div class="row" style="margin-bottom:8px">
          <select id="gbxAdminStockSelect" style="min-width:280px"></select>
          <button id="gbxAdminLoadStock">Load</button>
          <button id="gbxAdminResetOverrides" class="danger">Reset Overrides (Selected)</button>
        </div>
        <div class="grid" style="grid-template-columns:repeat(4,minmax(0,1fr));gap:10px">
          <div>
            <div class="muted mini">Current Price</div>
            <input id="gbxAdminPrice" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">Volatility</div>
            <input id="gbxAdminVol" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">Floor</div>
            <input id="gbxAdminFloor" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">Cap (Max Price)</div>
            <input id="gbxAdminCap" type="number" step="1">
          </div>
        </div>
        <div class="row" style="margin-top:10px;justify-content:space-between">
          <label class="pill" style="cursor:pointer">
            <input id="gbxAdminStagnant" type="checkbox" style="margin-right:8px">
            Stagnate This Stock
          </label>
          <button id="gbxAdminApplyStock" class="ok">Apply Changes</button>
        </div>
      </div>

      <div class="card">
        <div style="font-weight:900;margin-bottom:8px">Character Manager</div>
        <div class="muted mini" style="margin-bottom:10px">Add/Update custom characters or remove by id.</div>

        <div class="grid" style="grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:10px">
          <div>
            <div class="muted mini">id (unique)</div>
            <input id="gbxCharId" placeholder="e.g. new_guy">
          </div>
          <div>
            <div class="muted mini">name</div>
            <input id="gbxCharName" placeholder="Display Name">
          </div>
          <div>
            <div class="muted mini">type</div>
            <input id="gbxCharType" placeholder="human/npc/maji...">
          </div>
          <div>
            <div class="muted mini">folders (comma nums)</div>
            <input id="gbxCharFolders" placeholder="e.g. 5,3">
          </div>

          <div>
            <div class="muted mini">code</div>
            <input id="gbxCharCode" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">floor</div>
            <input id="gbxCharFloor" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">cap</div>
            <input id="gbxCharCap" type="number" step="1">
          </div>
          <div>
            <div class="muted mini">volatility</div>
            <input id="gbxCharVol" type="number" step="1">
          </div>

          <div style="grid-column: span 2">
            <div class="muted mini">image url (optional)</div>
            <input id="gbxCharImg" placeholder="https://...">
          </div>
          <div style="grid-column: span 2">
            <div class="muted mini">link url (optional)</div>
            <input id="gbxCharLink" placeholder="https://...">
          </div>
        </div>

        <div class="row" style="justify-content:space-between">
          <div class="row">
            <button id="gbxCharAdd" class="ok">Add / Update Character</button>
            <button id="gbxCharRemove" class="danger">Remove Character</button>
          </div>
          <div class="muted mini">Removing deletes custom entry + overrides + holdings for that id.</div>
        </div>
      </div>
    `;

    $("#gbxAdminLock", wrap).addEventListener("click", () => {
      setEditAuthed(false);
      renderAdmin();
      flashPill("Admin locked.");
    });

    // global freeze
    $("#gbxAdminGlobalFreeze", wrap).textContent = state.globalStagnant ? "UNFREEZE Market" : "FREEZE Market";
    $("#gbxAdminGlobalFreeze", wrap).addEventListener("click", () => {
      state.globalStagnant = !state.globalStagnant;
      persistState();
      renderHeader();
      renderMarket();
      renderAdmin();
    });

    // points
    const portSel = $("#gbxAdminPointsPort", wrap);
    portSel.innerHTML = "";
    for (const p of PORT_KEYS) {
      const o = document.createElement("option");
      o.value = p; o.textContent = p;
      portSel.appendChild(o);
    }
    portSel.value = state.activePortfolio;

    $("#gbxAdminSetPoints", wrap).addEventListener("click", () => {
      const p = portSel.value;
      const val = toInt($("#gbxAdminPointsVal", wrap).value, NaN);
      if (!Number.isFinite(val)) {
        flashPill("Enter a number.");
        return;
      }
      state.portfolios[p].points = val;
      persistState();
      renderHeader();
      renderHoldings();
      renderMarket();
      flashPill(`Points set for ${p}.`);
    });

    // stock select
    const stockSel = $("#gbxAdminStockSelect", wrap);
    stockSel.innerHTML = "";
    for (const c of chars) {
      const o = document.createElement("option");
      o.value = c.id;
      o.textContent = `${c.name} (${c.id})`;
      stockSel.appendChild(o);
    }

    const loadStockIntoFields = (id) => {
      const c = getAllCharacters().find((x) => x.id === id);
      if (!c) return;
      $("#gbxAdminPrice", wrap).value = toInt(state.prices[id], clamp(Math.round((c.floor + c.cap) / 2), c.floor, c.cap));
      $("#gbxAdminVol", wrap).value = c.volatility;
      $("#gbxAdminFloor", wrap).value = c.floor;
      $("#gbxAdminCap", wrap).value = c.cap;
      $("#gbxAdminStagnant", wrap).checked = !!c.stagnant;
    };

    $("#gbxAdminLoadStock", wrap).addEventListener("click", () => loadStockIntoFields(stockSel.value));
    stockSel.addEventListener("change", () => loadStockIntoFields(stockSel.value));

    $("#gbxAdminApplyStock", wrap).addEventListener("click", () => {
      const id = stockSel.value;
      const floor = toInt($("#gbxAdminFloor", wrap).value, 0);
      const cap = toInt($("#gbxAdminCap", wrap).value, floor);
      const vol = Math.max(0, toInt($("#gbxAdminVol", wrap).value, 0));
      let price = toInt($("#gbxAdminPrice", wrap).value, floor);
      const stagnant = !!$("#gbxAdminStagnant", wrap).checked;

      const fixedCap = Math.max(floor, cap);
      price = clamp(price, floor, fixedCap);

      overrides[id] = {
        ...(overrides[id] || {}),
        floor,
        cap: fixedCap,
        volatility: vol,
        stagnant,
      };
      persistOverrides();

      state.prices[id] = price;
      state.lastDelta[id] = 0;
      persistState();

      renderHeader();
      renderMarket();
      renderHoldings();
      renderCharacters();
      renderAdmin();

      flashPill("Stock updated.");
    });

    $("#gbxAdminResetOverrides", wrap).addEventListener("click", () => {
      const id = stockSel.value;
      if (overrides[id]) delete overrides[id];
      persistOverrides();

      // also snap price back into base bounds
      const base = (BASE_CHARACTERS.find((x) => x.id === id) || customChars[id]);
      const nb = normalizeChar(base || { id, floor: 0, cap: 0, volatility: 0, name: id, type: "unknown", folders: [], code: 0 });
      state.prices[id] = clamp(toInt(state.prices[id], 0), nb.floor, nb.cap);
      state.lastDelta[id] = 0;
      persistState();

      renderMarket();
      renderHoldings();
      renderCharacters();
      renderAdmin();
      flashPill("Overrides reset.");
    });

    // initial load
    if (chars.length) loadStockIntoFields(chars[0].id);

    // character manager
    function readCharForm() {
      const id = String($("#gbxCharId", wrap).value || "").trim();
      const name = String($("#gbxCharName", wrap).value || "").trim() || id;
      const type = String($("#gbxCharType", wrap).value || "").trim() || "custom";
      const foldersRaw = String($("#gbxCharFolders", wrap).value || "").trim();
      const folders = foldersRaw
        ? foldersRaw.split(",").map((s) => toInt(s.trim(), 0)).filter((n) => Number.isFinite(n))
        : [];
      const code = toInt($("#gbxCharCode", wrap).value, 0);
      const floor = toInt($("#gbxCharFloor", wrap).value, 0);
      const cap = Math.max(floor, toInt($("#gbxCharCap", wrap).value, floor));
      const volatility = Math.max(0, toInt($("#gbxCharVol", wrap).value, 0));
      const img = safeUrl($("#gbxCharImg", wrap).value || "");
      const link = safeUrl($("#gbxCharLink", wrap).value || "");
      return { id, name, type, folders, code, floor, cap, volatility, img, link };
    }

    $("#gbxCharAdd", wrap).addEventListener("click", () => {
      const c = readCharForm();
      if (!c.id) {
        flashPill("Character id required.");
        return;
      }
      customChars[c.id] = {
        id: c.id,
        name: c.name,
        type: c.type,
        folders: c.folders,
        code: c.code,
        floor: c.floor,
        cap: c.cap,
        volatility: c.volatility,
      };
      persistCustom();

      // also set media if provided
      if (c.img || c.link) {
        entityMedia[c.id] = {
          image: c.img || (entityMedia[c.id]?.image || ""),
          link: c.link || (entityMedia[c.id]?.link || ""),
        };
      }

      // ensure price exists
      if (!Number.isFinite(+state.prices[c.id])) {
        state.prices[c.id] = clamp(Math.round((c.floor + c.cap) / 2), c.floor, c.cap);
      } else {
        state.prices[c.id] = clamp(toInt(state.prices[c.id], c.floor), c.floor, c.cap);
      }
      persistState();

      renderMarket();
      renderHoldings();
      renderCharacters();
      renderAdmin();
      flashPill("Character added/updated.");
    });

    $("#gbxCharRemove", wrap).addEventListener("click", () => {
      const id = String($("#gbxCharId", wrap).value || "").trim();
      if (!id) {
        flashPill("Enter id to remove.");
        return;
      }
      // remove from custom
      if (customChars[id]) delete customChars[id];
      persistCustom();
      // remove overrides
      if (overrides[id]) delete overrides[id];
      persistOverrides();
      // remove price
      if (state.prices[id] != null) delete state.prices[id];
      if (state.lastDelta[id] != null) delete state.lastDelta[id];
      // remove holdings
      for (const p of PORT_KEYS) {
        if (state.portfolios[p]?.holdings?.[id] != null) delete state.portfolios[p].holdings[id];
      }
      persistState();

      renderMarket();
      renderHoldings();
      renderCharacters();
      renderAdmin();
      flashPill("Character removed.");
    });
  }

  /*****************************************************************
   * 12) STOCK TICK (VOLATILITY + CAPS + STAGNATION)
   *****************************************************************/
  function tickPrices() {
    if (state.globalStagnant) return;

    const chars = getAllCharacters();
    let changedAny = false;

    for (const c of chars) {
      if (c.stagnant) {
        state.lastDelta[c.id] = 0;
        continue;
      }

      const floor = toInt(c.floor, 0);
      const cap = Math.max(floor, toInt(c.cap, floor));
      const vol = Math.max(0, toInt(c.volatility, 0));

      const cur = clamp(toInt(state.prices[c.id], clamp(Math.round((floor + cap) / 2), floor, cap)), floor, cap);

      // volatility scale: keep it usable even with big vol values
      const step = (Math.random() * 2 - 1) * Math.max(1, Math.round(vol * 0.20));
      const drift = (Math.random() * 2 - 1) * 2;
      const next = clamp(Math.round(cur + step + drift), floor, cap);

      const delta = next - cur;
      state.prices[c.id] = next;
      state.lastDelta[c.id] = delta;
      if (delta !== 0) changedAny = true;

      // live update row if visible
      const rowRef = ui.stockRows.get(c.id);
      if (rowRef) {
        const row = rowRef.row;
        const priceEl = row.children[2]?.querySelector("div");
        const deltaEl = row.children[2]?.querySelector("div.mini");
        if (priceEl) priceEl.textContent = fmt(next);
        if (deltaEl) {
          deltaEl.textContent = deltaText(delta);
          deltaEl.className = `mini ${getDeltaClass(delta)}`;
        }
      }
    }

    if (changedAny) {
      persistState();
    }
  }

  /*****************************************************************
   * 13) BOOT
   *****************************************************************/
  buildUI();

  // continuous tick
  setInterval(tickPrices, Math.max(800, toInt(state.tickMs, 2500)));

})();
