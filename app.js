/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) ADMIN PASSWORD (CHANGE THIS)
   *****************************************************************/
  const EDIT_PANEL_PASSWORD = "CHANGE_THIS_PASSWORD"; // <-- change it
  const EDIT_AUTH_KEY = "gb_edit_authed_v2";

  /*****************************************************************
   * 1) YOUR entityMedia (AS PROVIDED)
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
   * 2) CHARACTERS (AS PROVIDED)
   *****************************************************************/
  function mk(id, name, type, tags, stock, min, max, base){
    return { id, name, type, tags: Array.isArray(tags) ? tags.slice() : [], stock, min, max, base };
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
   * 3) HELPERS
   *****************************************************************/
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const nnum = (v, fallback = 0) => {
    const x = Number(v);
    return Number.isFinite(x) ? x : fallback;
  };
  const safeUrl = (u) => {
    if (!u) return "";
    try {
      const url = new URL(u, location.href);
      if (!/^https?:$/.test(url.protocol)) return "";
      return url.href;
    } catch {
      return "";
    }
  };

  function isEditAuthed(){
    try { return sessionStorage.getItem(EDIT_AUTH_KEY) === "1"; } catch { return false; }
  }
  function setEditAuthed(v){
    try { sessionStorage.setItem(EDIT_AUTH_KEY, v ? "1" : "0"); } catch {}
  }

  /*****************************************************************
   * 4) STORAGE
   *****************************************************************/
  const KEY_STATE = "gbx_state_v5"; // bump to avoid old broken states

  function loadJSON(k, fallback){
    try{
      const raw = localStorage.getItem(k);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
  function saveJSON(k, v){
    try{ localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }

  /*****************************************************************
   * 5) GAME STATE
   *****************************************************************/
  const FOLDERS = ["J","M","B","K","R"];
  const DEFAULT_POINTS = 5000;

  function defaultStockForChar(ch){
    const base = nnum(ch.base, 100);
    const min = nnum(ch.min, Math.max(1, base * 0.7));
    const max = nnum(ch.max, base * 1.3);
    const init = clamp(base, min, max);
    return {
      id: ch.id,
      price: init,
      volatility: 1.0,      // 0 = no movement
      capMax: max * 2,      // absolute max this stock can reach
      stagnated: false
    };
  }

  const DEFAULT_STATE = {
    version: 5,
    ui: { tab: "Market", folder: "J", selectedId: BASE_CHARACTERS[0]?.id || "" },
    folders: Object.fromEntries(FOLDERS.map(f => [f, { points: DEFAULT_POINTS }])),
    stocks: Object.fromEntries(BASE_CHARACTERS.map(ch => [ch.id, defaultStockForChar(ch)])),
  };

  const state = (() => {
    const s = loadJSON(KEY_STATE, null);
    if (!s || typeof s !== "object") return structuredClone(DEFAULT_STATE);

    // soft-migrate: ensure everyone exists
    const merged = structuredClone(DEFAULT_STATE);

    // keep UI if present
    if (s.ui && typeof s.ui === "object") {
      merged.ui.tab = typeof s.ui.tab === "string" ? s.ui.tab : merged.ui.tab;
      merged.ui.folder = typeof s.ui.folder === "string" ? s.ui.folder : merged.ui.folder;
      merged.ui.selectedId = typeof s.ui.selectedId === "string" ? s.ui.selectedId : merged.ui.selectedId;
    }

    // folders
    if (s.folders && typeof s.folders === "object") {
      for (const f of FOLDERS) {
        const pts = nnum(s.folders?.[f]?.points, merged.folders[f].points);
        merged.folders[f].points = pts;
      }
    }

    // stocks: take saved, but ensure all characters exist
    if (s.stocks && typeof s.stocks === "object") {
      for (const ch of BASE_CHARACTERS) {
        const def = merged.stocks[ch.id];
        const old = s.stocks[ch.id];
        if (old && typeof old === "object") {
          def.price = clamp(nnum(old.price, def.price), 0, 1e12);
          def.volatility = clamp(nnum(old.volatility, def.volatility), 0, 1000);
          def.capMax = Math.max(0, nnum(old.capMax, def.capMax));
          def.stagnated = !!old.stagnated;
        }
        // also ensure capMax at least current price
        def.capMax = Math.max(def.capMax, def.price);
        merged.stocks[ch.id] = def;
      }
    }

    return merged;
  })();

  function persist(){
    saveJSON(KEY_STATE, state);
  }

  /*****************************************************************
   * 6) UI INJECTION (so it won't depend on your HTML)
   *****************************************************************/
  function injectStyles(){
    const css = `
      :root { color-scheme: dark; }
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      #gb-app { padding: 14px; max-width: 1200px; margin: 0 auto; }
      .gb-top { display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between; }
      .gb-title { font-weight: 800; letter-spacing: .5px; font-size: 18px; }
      .gb-tabs { display:flex; gap:8px; flex-wrap:wrap; }
      .gb-tab { border:1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06); color: #fff; padding: 8px 10px; border-radius: 10px; cursor:pointer; user-select:none; }
      .gb-tab[aria-current="true"] { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.30); }
      .gb-panel { margin-top: 12px; border:1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04); border-radius: 14px; padding: 12px; }
      .gb-row { display:flex; gap:12px; flex-wrap:wrap; }
      .gb-card { width: 260px; border:1px solid rgba(255,255,255,.12); background: rgba(0,0,0,.25); border-radius: 14px; overflow:hidden; }
      .gb-card img { width:100%; height:160px; object-fit:cover; display:block; background: rgba(255,255,255,.06); }
      .gb-card .pad { padding: 10px; }
      .gb-card h3 { margin: 0 0 6px; font-size: 14px; }
      .gb-meta { opacity:.85; font-size: 12px; }
      .gb-price { margin-top: 8px; display:flex; justify-content:space-between; font-weight:700; }
      .gb-btn { border:1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.08); color:#fff; padding:8px 10px; border-radius: 10px; cursor:pointer; }
      .gb-btn:active { transform: translateY(1px); }
      .gb-grid { display:flex; flex-wrap:wrap; gap: 12px; }
      .gb-kv { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
      .gb-kv b { font-weight:800; }
      .gb-select, .gb-input { border:1px solid rgba(255,255,255,.16); background: rgba(0,0,0,.35); color:#fff; padding: 8px 10px; border-radius: 10px; }
      .gb-modal-back { position:fixed; inset:0; background: rgba(0,0,0,.55); display:none; align-items:center; justify-content:center; padding: 16px; z-index: 9999; }
      .gb-modal { width:min(520px, 100%); border:1px solid rgba(255,255,255,.18); background: rgba(15,15,18,.95); border-radius: 14px; padding: 12px; }
      .gb-modal h2 { margin: 0 0 8px; font-size: 16px; }
      .gb-modal p { margin: 0 0 10px; opacity:.9; }
      .gb-divider { height:1px; background: rgba(255,255,255,.10); margin: 10px 0; }
      .gb-small { font-size: 12px; opacity:.85; }
      a.gb-link { color: inherit; text-decoration: none; }
      a.gb-link:hover { text-decoration: underline; }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function ensureRoot(){
    let root = document.getElementById("gb-app");
    if (!root) {
      root = document.createElement("div");
      root.id = "gb-app";
      document.body.appendChild(root);
    }
    return root;
  }

  /*****************************************************************
   * 7) STOCK ENGINE
   *****************************************************************/
  function tickStocks(){
    // simple random walk with volatility; stagnated means frozen
    for (const ch of BASE_CHARACTERS) {
      const st = state.stocks[ch.id];
      if (!st) continue;

      if (st.stagnated || st.volatility <= 0) continue;

      const v = nnum(st.volatility, 1);
      // movement scale: based on current price but gentle
      const scale = Math.max(1, st.price * 0.006) * v;
      const delta = (Math.random() - 0.5) * 2 * scale;

      let next = st.price + delta;
      next = Math.max(0, next);
      next = Math.min(next, st.capMax);
      st.price = next;
    }
  }

  /*****************************************************************
   * 8) RENDERING
   *****************************************************************/
  let root, modalBack;

  function setTab(name){
    state.ui.tab = name;
    persist();
    render();
  }

  function setFolder(letter){
    if (!FOLDERS.includes(letter)) return;
    state.ui.folder = letter;
    persist();
    render();
  }

  function setSelected(id){
    state.ui.selectedId = id;
    persist();
    render();
  }

  function money(n){
    const x = Math.round(nnum(n, 0));
    return x.toLocaleString("en-US");
  }

  function getPoints(folder){
    return nnum(state.folders?.[folder]?.points, DEFAULT_POINTS);
  }

  function addPoints(folder, amt){
    const a = nnum(amt, 0);
    state.folders[folder].points = nnum(state.folders[folder].points, DEFAULT_POINTS) + a;
    persist();
    render();
  }

  function setPoints(folder, value){
    state.folders[folder].points = Math.max(0, nnum(value, 0));
    persist();
    render();
  }

  function openModal(node){
    modalBack.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "gb-modal";
    wrap.appendChild(node);
    modalBack.appendChild(wrap);
    modalBack.style.display = "flex";
  }

  function closeModal(){
    modalBack.style.display = "none";
    modalBack.innerHTML = "";
  }

  function requireAdminThen(cb){
    if (isEditAuthed()) { cb(); return; }

    const box = document.createElement("div");
    const h = document.createElement("h2");
    h.textContent = "Admin Lock";
    const p = document.createElement("p");
    p.textContent = "Enter the admin password to open the Edit Panel.";
    const row = document.createElement("div");
    row.className = "gb-kv";

    const input = document.createElement("input");
    input.className = "gb-input";
    input.type = "password";
    input.placeholder = "Password";
    input.autocomplete = "current-password";

    const ok = document.createElement("button");
    ok.className = "gb-btn";
    ok.textContent = "Unlock";

    const cancel = document.createElement("button");
    cancel.className = "gb-btn";
    cancel.textContent = "Cancel";

    const msg = document.createElement("div");
    msg.className = "gb-small";
    msg.style.marginTop = "8px";

    function doUnlock(){
      const val = String(input.value || "");
      if (val === EDIT_PANEL_PASSWORD) {
        setEditAuthed(true);
        closeModal();
        cb();
      } else {
        msg.textContent = "Wrong password.";
      }
    }

    ok.addEventListener("click", doUnlock);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doUnlock();
      if (e.key === "Escape") closeModal();
    });
    cancel.addEventListener("click", closeModal);

    row.appendChild(input);
    row.appendChild(ok);
    row.appendChild(cancel);

    box.appendChild(h);
    box.appendChild(p);
    box.appendChild(row);
    box.appendChild(msg);

    openModal(box);
    input.focus();
  }

  function renderMarket(){
    const panel = document.createElement("div");
    panel.className = "gb-panel";

    const folderRow = document.createElement("div");
    folderRow.className = "gb-row";

    const left = document.createElement("div");
    left.className = "gb-kv";

    const folderLabel = document.createElement("div");
    folderLabel.innerHTML = `<b>Folder:</b>`;

    const folderSelect = document.createElement("select");
    folderSelect.className = "gb-select";
    for (const f of FOLDERS) {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = f;
      if (f === state.ui.folder) opt.selected = true;
      folderSelect.appendChild(opt);
    }
    folderSelect.addEventListener("change", () => setFolder(folderSelect.value));

    const points = document.createElement("div");
    points.className = "gb-kv";
    points.innerHTML = `<b>Points:</b> ${money(getPoints(state.ui.folder))}`;

    left.appendChild(folderLabel);
    left.appendChild(folderSelect);
    left.appendChild(points);

    const right = document.createElement("div");
    right.className = "gb-kv";

    const sel = document.createElement("select");
    sel.className = "gb-select";
    for (const ch of BASE_CHARACTERS) {
      const opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = `${ch.name} (${ch.id})`;
      if (ch.id === state.ui.selectedId) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.addEventListener("change", () => setSelected(sel.value));

    const st = state.stocks[state.ui.selectedId];
    const stInfo = document.createElement("div");
    stInfo.className = "gb-small";
    stInfo.innerHTML = st
      ? `Price: <b>${money(st.price)}</b> • Vol: <b>${st.volatility}</b> • Cap: <b>${money(st.capMax)}</b> • Stagnated: <b>${st.stagnated ? "YES" : "NO"}</b>`
      : "No stock selected.";

    right.appendChild(document.createTextNode("Selected: "));
    right.appendChild(sel);
    right.appendChild(stInfo);

    folderRow.appendChild(left);
    folderRow.appendChild(right);

    const grid = document.createElement("div");
    grid.className = "gb-grid";
    grid.style.marginTop = "12px";

    for (const ch of BASE_CHARACTERS) {
      const st = state.stocks[ch.id];
      const media = entityMedia[ch.id] || {};
      const imgUrl = safeUrl(media.image);
      const linkUrl = safeUrl(media.link);

      const card = document.createElement("div");
      card.className = "gb-card";

      const img = document.createElement("img");
      img.alt = ch.name;
      if (imgUrl) img.src = imgUrl;

      const pad = document.createElement("div");
      pad.className = "pad";

      const title = document.createElement("h3");
      title.textContent = ch.name;

      const meta = document.createElement("div");
      meta.className = "gb-meta";
      meta.textContent = `${ch.type} • id: ${ch.id}`;

      const price = document.createElement("div");
      price.className = "gb-price";
      price.innerHTML = `<span>Price</span><span>${money(st?.price ?? 0)}</span>`;

      const small = document.createElement("div");
      small.className = "gb-small";
      small.style.marginTop = "6px";
      small.textContent = `Vol: ${st?.volatility ?? 0} • Cap: ${money(st?.capMax ?? 0)} • ${st?.stagnated ? "STAGNATED" : "LIVE"}`;

      const btnRow = document.createElement("div");
      btnRow.className = "gb-kv";
      btnRow.style.marginTop = "10px";

      const pick = document.createElement("button");
      pick.className = "gb-btn";
      pick.textContent = "Select";
      pick.addEventListener("click", () => setSelected(ch.id));

      btnRow.appendChild(pick);

      if (linkUrl) {
        const a = document.createElement("a");
        a.className = "gb-btn gb-link";
        a.href = linkUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Open Link";
        btnRow.appendChild(a);
      }

      pad.appendChild(title);
      pad.appendChild(meta);
      pad.appendChild(price);
      pad.appendChild(small);
      pad.appendChild(btnRow);

      card.appendChild(img);
      card.appendChild(pad);
      grid.appendChild(card);
    }

    panel.appendChild(folderRow);
    panel.appendChild(grid);
    return panel;
  }

  function renderCharacters(){
    const panel = document.createElement("div");
    panel.className = "gb-panel";

    const p = document.createElement("div");
    p.className = "gb-small";
    p.textContent = `Loaded characters: ${BASE_CHARACTERS.length}. Images come from entityMedia when available.`;
    panel.appendChild(p);

    const list = document.createElement("div");
    list.className = "gb-grid";
    list.style.marginTop = "12px";

    for (const ch of BASE_CHARACTERS) {
      const media = entityMedia[ch.id] || {};
      const imgUrl = safeUrl(media.image);
      const linkUrl = safeUrl(media.link);

      const card = document.createElement("div");
      card.className = "gb-card";

      const img = document.createElement("img");
      img.alt = ch.name;
      if (imgUrl) img.src = imgUrl;

      const pad = document.createElement("div");
      pad.className = "pad";

      const title = document.createElement("h3");
      title.textContent = ch.name;

      const meta = document.createElement("div");
      meta.className = "gb-meta";
      meta.textContent = `id: ${ch.id} • type: ${ch.type} • stock# ${ch.stock}`;

      const stats = document.createElement("div");
      stats.className = "gb-small";
      stats.style.marginTop = "6px";
      stats.textContent = `min:${money(ch.min)} max:${money(ch.max)} base:${money(ch.base)} tags:[${(ch.tags||[]).join(",")}]`;

      const row = document.createElement("div");
      row.className = "gb-kv";
      row.style.marginTop = "10px";

      const sel = document.createElement("button");
      sel.className = "gb-btn";
      sel.textContent = "Select in Market";
      sel.addEventListener("click", () => { state.ui.tab = "Market"; setSelected(ch.id); });

      row.appendChild(sel);

      if (linkUrl) {
        const a = document.createElement("a");
        a.className = "gb-btn gb-link";
        a.href = linkUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Open Link";
        row.appendChild(a);
      }

      pad.appendChild(title);
      pad.appendChild(meta);
      pad.appendChild(stats);
      pad.appendChild(row);

      card.appendChild(img);
      card.appendChild(pad);
      list.appendChild(card);
    }

    panel.appendChild(list);
    return panel;
  }

  function renderEditPanel(){
    const panel = document.createElement("div");
    panel.className = "gb-panel";

    const h = document.createElement("div");
    h.className = "gb-kv";
    h.innerHTML = `<b>Admin Panel</b> <span class="gb-small">(stagnate, volatility, set price, max cap, give points)</span>`;

    const logout = document.createElement("button");
    logout.className = "gb-btn";
    logout.textContent = "Lock (log out)";
    logout.addEventListener("click", () => {
      setEditAuthed(false);
      render();
    });
    h.appendChild(logout);

    panel.appendChild(h);
    panel.appendChild(divider());

    // Folder points controls
    const folderBox = document.createElement("div");
    folderBox.className = "gb-kv";
    folderBox.innerHTML = `<b>Folder Points:</b>`;

    const folderSel = document.createElement("select");
    folderSel.className = "gb-select";
    for (const f of FOLDERS) {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = f;
      if (f === state.ui.folder) opt.selected = true;
      folderSel.appendChild(opt);
    }

    const ptsNow = document.createElement("div");
    ptsNow.className = "gb-small";

    function refreshPtsNow(){
      const f = folderSel.value;
      ptsNow.textContent = `Current points in ${f}: ${money(getPoints(f))}`;
    }
    folderSel.addEventListener("change", refreshPtsNow);
    refreshPtsNow();

    const addPts = document.createElement("input");
    addPts.className = "gb-input";
    addPts.type = "number";
    addPts.step = "1";
    addPts.placeholder = "Add points (e.g. 1000000)";

    const addBtn = document.createElement("button");
    addBtn.className = "gb-btn";
    addBtn.textContent = "Give Points";
    addBtn.addEventListener("click", () => {
      addPoints(folderSel.value, nnum(addPts.value, 0));
      addPts.value = "";
      refreshPtsNow();
    });

    const setPts = document.createElement("input");
    setPts.className = "gb-input";
    setPts.type = "number";
    setPts.step = "1";
    setPts.placeholder = "Set points (absolute)";

    const setBtn = document.createElement("button");
    setBtn.className = "gb-btn";
    setBtn.textContent = "Set Points";
    setBtn.addEventListener("click", () => {
      setPoints(folderSel.value, nnum(setPts.value, 0));
      setPts.value = "";
      refreshPtsNow();
    });

    folderBox.appendChild(folderSel);
    folderBox.appendChild(ptsNow);
    folderBox.appendChild(addPts);
    folderBox.appendChild(addBtn);
    folderBox.appendChild(setPts);
    folderBox.appendChild(setBtn);

    panel.appendChild(folderBox);
    panel.appendChild(divider());

    // Stock controls
    const stockBox = document.createElement("div");
    stockBox.className = "gb-kv";
    stockBox.innerHTML = `<b>Stock Controls:</b>`;

    const stockSel = document.createElement("select");
    stockSel.className = "gb-select";
    for (const ch of BASE_CHARACTERS) {
      const opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = `${ch.name} (${ch.id})`;
      if (ch.id === state.ui.selectedId) opt.selected = true;
      stockSel.appendChild(opt);
    }

    const stNow = document.createElement("div");
    stNow.className = "gb-small";

    const volInput = document.createElement("input");
    volInput.className = "gb-input";
    volInput.type = "number";
    volInput.step = "0.1";
    volInput.placeholder = "Volatility (0 = frozen)";

    const priceInput = document.createElement("input");
    priceInput.className = "gb-input";
    priceInput.type = "number";
    priceInput.step = "1";
    priceInput.placeholder = "Set price";

    const capInput = document.createElement("input");
    capInput.className = "gb-input";
    capInput.type = "number";
    capInput.step = "1";
    capInput.placeholder = "Set max cap";

    const stagnateBtn = document.createElement("button");
    stagnateBtn.className = "gb-btn";

    function refreshStockNow(){
      const id = stockSel.value;
      state.ui.selectedId = id; // keep selection synced
      const st = state.stocks[id];
      stNow.innerHTML = st
        ? `Price: <b>${money(st.price)}</b> • Vol: <b>${st.volatility}</b> • Cap: <b>${money(st.capMax)}</b> • Stagnated: <b>${st.stagnated ? "YES" : "NO"}</b>`
        : "Unknown stock.";

      stagnateBtn.textContent = (st && st.stagnated) ? "Unstagnate (Resume)" : "Stagnate (Freeze)";
    }

    stockSel.addEventListener("change", refreshStockNow);

    const applyVol = document.createElement("button");
    applyVol.className = "gb-btn";
    applyVol.textContent = "Apply Volatility";
    applyVol.addEventListener("click", () => {
      const id = stockSel.value;
      const st = state.stocks[id];
      if (!st) return;
      st.volatility = clamp(nnum(volInput.value, st.volatility), 0, 1000);
      persist();
      refreshStockNow();
      render(); // reflect immediately on market
    });

    const applyPrice = document.createElement("button");
    applyPrice.className = "gb-btn";
    applyPrice.textContent = "Set Price";
    applyPrice.addEventListener("click", () => {
      const id = stockSel.value;
      const st = state.stocks[id];
      if (!st) return;
      const val = Math.max(0, nnum(priceInput.value, st.price));
      st.price = Math.min(val, st.capMax);
      // ensure cap >= price (if user set cap lower earlier)
      st.capMax = Math.max(st.capMax, st.price);
      persist();
      refreshStockNow();
      render();
    });

    const applyCap = document.createElement("button");
    applyCap.className = "gb-btn";
    applyCap.textContent = "Set Max Cap";
    applyCap.addEventListener("click", () => {
      const id = stockSel.value;
      const st = state.stocks[id];
      if (!st) return;
      const val = Math.max(0, nnum(capInput.value, st.capMax));
      st.capMax = Math.max(val, st.price); // cap can’t be below current price
      persist();
      refreshStockNow();
      render();
    });

    stagnateBtn.addEventListener("click", () => {
      const id = stockSel.value;
      const st = state.stocks[id];
      if (!st) return;
      st.stagnated = !st.stagnated;
      persist();
      refreshStockNow();
      render();
    });

    const resetAll = document.createElement("button");
    resetAll.className = "gb-btn";
    resetAll.textContent = "Reset ALL Stocks (defaults)";
    resetAll.addEventListener("click", () => {
      for (const ch of BASE_CHARACTERS) {
        state.stocks[ch.id] = defaultStockForChar(ch);
      }
      persist();
      refreshStockNow();
      render();
    });

    stockBox.appendChild(stockSel);
    stockBox.appendChild(stNow);
    stockBox.appendChild(volInput);
    stockBox.appendChild(applyVol);
    stockBox.appendChild(priceInput);
    stockBox.appendChild(applyPrice);
    stockBox.appendChild(capInput);
    stockBox.appendChild(applyCap);
    stockBox.appendChild(stagnateBtn);
    stockBox.appendChild(resetAll);

    panel.appendChild(stockBox);

    refreshStockNow();
    return panel;
  }

  function divider(){
    const d = document.createElement("div");
    d.className = "gb-divider";
    return d;
  }

  function render(){
    if (!root) return;

    root.innerHTML = "";

    const top = document.createElement("div");
    top.className = "gb-top";

    const title = document.createElement("div");
    title.className = "gb-title";
    title.textContent = "GATE//BREACH — Market";

    const tabs = document.createElement("div");
    tabs.className = "gb-tabs";

    const tabNames = ["Market", "Characters", "Edit"];
    for (const t of tabNames) {
      const btn = document.createElement("button");
      btn.className = "gb-tab";
      btn.type = "button";
      btn.textContent = t;
      btn.setAttribute("aria-current", String(state.ui.tab === t));
      btn.addEventListener("click", () => {
        if (t === "Edit") {
          requireAdminThen(() => setTab("Edit"));
        } else {
          setTab(t);
        }
      });
      tabs.appendChild(btn);
    }

    top.appendChild(title);
    top.appendChild(tabs);
    root.appendChild(top);

    // content
    let content;
    if (state.ui.tab === "Market") content = renderMarket();
    else if (state.ui.tab === "Characters") content = renderCharacters();
    else if (state.ui.tab === "Edit") {
      // If they somehow force it open without auth, re-lock.
      if (!isEditAuthed()) {
        state.ui.tab = "Market";
        persist();
        content = renderMarket();
      } else {
        content = renderEditPanel();
      }
    } else {
      content = renderMarket();
    }

    root.appendChild(content);
  }

  /*****************************************************************
   * 9) BOOT
   *****************************************************************/
  function boot(){
    injectStyles();
    root = ensureRoot();

    modalBack = document.createElement("div");
    modalBack.className = "gb-modal-back";
    modalBack.addEventListener("click", (e) => {
      if (e.target === modalBack) closeModal();
    });
    document.body.appendChild(modalBack);

    // Make sure folders always exist
    for (const f of FOLDERS) {
      if (!state.folders[f]) state.folders[f] = { points: DEFAULT_POINTS };
      if (typeof state.folders[f].points !== "number") state.folders[f].points = DEFAULT_POINTS;
    }

    // Make sure every character stock exists (this is the "add everyone" safety net)
    for (const ch of BASE_CHARACTERS) {
      if (!state.stocks[ch.id]) state.stocks[ch.id] = defaultStockForChar(ch);
    }

    persist();
    render();

    // engine loop
    setInterval(() => {
      tickStocks();
      persist();
      // re-render only if on Market (keeps it smooth)
      if (state.ui.tab === "Market") render();
    }, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
