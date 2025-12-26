/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) ADMIN PASSWORD (CHANGE THIS)
   *****************************************************************/
  const ADMIN_PASSWORD = "Bumjin"; // <-- change it
  const ADMIN_AUTH_KEY = "gb_admin_authed_v1";

  /*****************************************************************
   * 1) BASE MEDIA (YOUR entityMedia)
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
   * 2) CHARACTERS (YOUR PROVIDED LIST)
   *****************************************************************/
  function mk(id, name, type, tags, stock, min, max, base) {
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
  const money = (n) => Math.round(nnum(n, 0)).toLocaleString("en-US");
  const pct = (n) => (Math.round(n * 10) / 10).toFixed(1) + "%";

  function isAdminAuthed() {
    try { return sessionStorage.getItem(ADMIN_AUTH_KEY) === "1"; } catch { return false; }
  }
  function setAdminAuthed(v) {
    try { sessionStorage.setItem(ADMIN_AUTH_KEY, v ? "1" : "0"); } catch {}
  }

  /*****************************************************************
   * 4) STORAGE
   *****************************************************************/
  const KEY_STATE = "gbx_state_html_v1";

  function loadJSON(k, fallback) {
    try {
      const raw = localStorage.getItem(k);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
  function saveJSON(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }

  /*****************************************************************
   * 5) STATE / DEFAULTS
   *****************************************************************/
  const FOLDERS = ["J", "M", "B", "K", "R"];
  const DEFAULT_CASH = 5000;

  function defaultStockForChar(ch) {
    const base = nnum(ch.base, 100);
    const min = nnum(ch.min, Math.max(1, base * 0.7));
    const max = nnum(ch.max, base * 1.3);
    const init = clamp(base, min, max);
    return {
      id: ch.id,
      price: init,
      volatility: 1.0,
      cap: Math.max(max * 2, init),
      frozen: false,
      history: [init],
      lastDelta: 0
    };
  }

  const DEFAULT_STATE = {
    version: 1,
    ui: {
      nav: "market",
      folder: "J",
      selectedId: BASE_CHARACTERS[0]?.id || "",
      bulkMode: false,
      bulkSelected: [],
      bulkQty: 1
    },
    day: 0,
    folders: Object.fromEntries(FOLDERS.map(f => [f, { cash: DEFAULT_CASH, holdings: {} }])),
    stocks: Object.fromEntries(BASE_CHARACTERS.map(ch => [ch.id, defaultStockForChar(ch)])),
    mediaOverrides: {},      // { id: {image, link} }
    customChars: [],         // extra characters added by admin
    removedIds: []           // ids removed by admin
  };

  const state = (() => {
    const s = loadJSON(KEY_STATE, null);
    if (!s || typeof s !== "object") return structuredClone(DEFAULT_STATE);

    // Merge & sanity
    const m = structuredClone(DEFAULT_STATE);

    // ui
    if (s.ui && typeof s.ui === "object") {
      if (typeof s.ui.nav === "string") m.ui.nav = s.ui.nav;
      if (typeof s.ui.folder === "string") m.ui.folder = s.ui.folder;
      if (typeof s.ui.selectedId === "string") m.ui.selectedId = s.ui.selectedId;
      m.ui.bulkMode = !!s.ui.bulkMode;
      if (Array.isArray(s.ui.bulkSelected)) m.ui.bulkSelected = s.ui.bulkSelected.filter(x => typeof x === "string");
      m.ui.bulkQty = clamp(nnum(s.ui.bulkQty, 1), 1, 1e6);
    }

    // day
    m.day = Math.max(0, Math.floor(nnum(s.day, 0)));

    // folders
    if (s.folders && typeof s.folders === "object") {
      for (const f of FOLDERS) {
        const cur = s.folders[f];
        if (cur && typeof cur === "object") {
          m.folders[f].cash = Math.max(0, nnum(cur.cash, m.folders[f].cash));
          if (cur.holdings && typeof cur.holdings === "object") {
            m.folders[f].holdings = {};
            for (const [id, qty] of Object.entries(cur.holdings)) {
              const q = Math.max(0, Math.floor(nnum(qty, 0)));
              if (q > 0) m.folders[f].holdings[id] = q;
            }
          }
        }
      }
    }

    // media overrides
    if (s.mediaOverrides && typeof s.mediaOverrides === "object") {
      for (const [id, v] of Object.entries(s.mediaOverrides)) {
        if (!v || typeof v !== "object") continue;
        const img = safeUrl(v.image);
        const link = safeUrl(v.link);
        m.mediaOverrides[id] = { image: img, link };
      }
    }

    // custom chars / removed
    if (Array.isArray(s.customChars)) {
      m.customChars = s.customChars
        .filter(c => c && typeof c === "object" && typeof c.id === "string" && typeof c.name === "string")
        .map(c => ({
          id: String(c.id).trim(),
          name: String(c.name),
          type: String(c.type || "custom"),
          tags: Array.isArray(c.tags) ? c.tags.map(n => Math.floor(nnum(n, 0))) : [],
          stock: Math.floor(nnum(c.stock, 0)),
          min: nnum(c.min, 0),
          max: nnum(c.max, 0),
          base: nnum(c.base, 0)
        }))
        .filter(c => c.id);
    }
    if (Array.isArray(s.removedIds)) {
      m.removedIds = s.removedIds.filter(x => typeof x === "string");
    }

    // stocks
    if (s.stocks && typeof s.stocks === "object") {
      for (const [id, v] of Object.entries(s.stocks)) {
        if (!v || typeof v !== "object") continue;
        m.stocks[id] = {
          id,
          price: Math.max(0, nnum(v.price, 0)),
          volatility: clamp(nnum(v.volatility, 1), 0, 1000),
          cap: Math.max(0, nnum(v.cap, 0)),
          frozen: !!v.frozen,
          history: Array.isArray(v.history) ? v.history.slice(-120).map(x => Math.max(0, nnum(x, 0))) : [],
          lastDelta: nnum(v.lastDelta, 0)
        };
        if (m.stocks[id].history.length === 0) m.stocks[id].history = [m.stocks[id].price || 0];
        m.stocks[id].cap = Math.max(m.stocks[id].cap, m.stocks[id].price);
      }
    }

    return m;
  })();

  function persist() {
    saveJSON(KEY_STATE, state);
  }

  /*****************************************************************
   * 6) CHARACTER LIST (base + custom - removed)
   *****************************************************************/
  function getAllCharacters() {
    const removed = new Set(state.removedIds || []);
    const base = BASE_CHARACTERS.filter(c => !removed.has(c.id));
    const custom = (state.customChars || []).filter(c => c && c.id && !removed.has(c.id));
    // de-dupe by id (custom overrides base if same id)
    const map = new Map();
    for (const c of base) map.set(c.id, c);
    for (const c of custom) map.set(c.id, c);
    return Array.from(map.values());
  }

  function getCharById(id) {
    return getAllCharacters().find(c => c.id === id) || null;
  }

  function getMedia(id) {
    const o = state.mediaOverrides[id];
    const base = entityMedia[id];
    const img = safeUrl((o && o.image) || (base && base.image) || "");
    const link = safeUrl((o && o.link) || (base && base.link) || "");
    return { image: img, link };
  }

  function ensureStock(id) {
    if (state.stocks[id]) return;
    const ch = getCharById(id);
    if (!ch) return;
    state.stocks[id] = defaultStockForChar(ch);
  }

  /*****************************************************************
   * 7) DOM REFS + PATCHES (to use your CSS grid)
   *****************************************************************/
  const dom = {
    // nav
    navBtns: $$(".pill[data-nav]"),

    // panels
    marketPanel: $("#marketPanel"),
    projectsPanel: $("#projectsPanel"),
    editPanel: $("#editPanel"),

    // topbar
    dayEl: $("#dayEl"),
    balanceEl: $("#balanceEl"),
    netWorthEl: $("#netWorthEl"),

    // market filters
    searchInput: $("#searchInput"),
    arcSelect: $("#arcSelect"),
    typeSelect: $("#typeSelect"),
    sortSelect: $("#sortSelect"),
    resultCount: $("#resultCount"),
    marketGrid: $("#marketGrid"),

    // projects (folders) grid
    projectsGrid: $("#projectsGrid"),

    // wanted
    wantedImg: $("#wantedImg"),
    wantedName: $("#wantedName"),
    wantedRole: $("#wantedRole"),
    wantedPrice: $("#wantedPrice"),
    wantedOwned: $("#wantedOwned"),
    wantedPop: $("#wantedPop"),
    wantedPot: $("#wantedPot"),
    wantedCap: $("#wantedCap"),
    wantedFrozen: $("#wantedFrozen"),
    wantedBuyBtn: $("#wantedBuyBtn"),
    wantedSellBtn: $("#wantedSellBtn"),
    wantedLinkBtn: $("#wantedLinkBtn"),

    // portfolio
    positionsCount: $("#positionsCount"),
    holdingsValue: $("#holdingsValue"),
    cashValue: $("#cashValue"),
    positionsList: $("#positionsList"),
    resetAllBtn: $("#resetAllBtn"),

    // movers
    gainersList: $("#gainersList"),
    losersList: $("#losersList"),

    // sim
    playBtn: $("#playBtn"),
    pauseBtn: $("#pauseBtn"),
    step1Btn: $("#step1Btn"),
    step10Btn: $("#step10Btn"),
    speedSelect: $("#speedSelect"),
    globalVol: $("#globalVol"),

    // edit existing controls
    editCharSelect: $("#editCharSelect"),
    editImg: $("#editImg"),
    editLink: $("#editLink"),
    bulkJson: $("#bulkJson"),
    saveEditBtn: $("#saveEditBtn"),
    resetEditBtn: $("#resetEditBtn"),
    applyBulkBtn: $("#applyBulkBtn"),

    // modal
    modalBackdrop: $("#modalBackdrop"),
    detailModal: $("#detailModal"),
    closeModalBtn: $("#closeModalBtn"),
    modalImg: $("#modalImg"),
    modalTitle: $("#modalTitle"),
    modalSub: $("#modalSub"),
    modalPrice: $("#modalPrice"),
    modalOwned: $("#modalOwned"),
    modalPotential: $("#modalPotential"),
    modalPop: $("#modalPop"),
    modalCap: $("#modalCap"),
    modalFrozen: $("#modalFrozen"),
    spark: $("#spark"),
    historyList: $("#historyList"),
    modalBuyBtn: $("#modalBuyBtn"),
    modalSellBtn: $("#modalSellBtn"),
    modalLinkBtn: $("#modalLinkBtn"),
  };

  function domSanity() {
    const required = [
      "marketPanel","projectsPanel","editPanel","marketGrid","projectsGrid",
      "wantedImg","wantedName","wantedPrice","wantedBuyBtn",
      "positionsList","resetAllBtn","gainersList","losersList",
      "modalBackdrop","detailModal","closeModalBtn","spark"
    ];
    for (const k of required) {
      if (!dom[k]) {
        console.warn("[GB] Missing DOM element:", k);
      }
    }

    // Patch classnames so your CSS grid styles apply to the right containers
    if (dom.marketGrid) dom.marketGrid.classList.add("projectsGrid");
    if (dom.positionsList) dom.positionsList.classList.add("portfolioList");
    if (dom.marketPanel) {
      const filters = $(".filters", dom.marketPanel);
      if (filters) {
        filters.classList.add("filterBar");
        filters.classList.add("filterRow");
      }
    }
  }

  /*****************************************************************
   * 8) NAV + ADMIN LOCK (PASSWORD)
   *****************************************************************/
  function showOnly(nav) {
    state.ui.nav = nav;

    if (dom.marketPanel) dom.marketPanel.classList.toggle("hidden", nav !== "market");
    if (dom.projectsPanel) dom.projectsPanel.classList.toggle("hidden", nav !== "projects");
    if (dom.editPanel) dom.editPanel.classList.toggle("hidden", nav !== "edit");

    for (const b of dom.navBtns) {
      const on = b.getAttribute("data-nav") === nav;
      b.classList.toggle("active", on);
    }
    persist();
    renderAll();
  }

  function openAdminPrompt(onSuccess) {
    // Use #modalBackdrop as a generic prompt container (no HTML changes needed)
    const back = dom.modalBackdrop;
    if (!back) {
      const val = prompt("Admin password:");
      if (val === ADMIN_PASSWORD) {
        setAdminAuthed(true);
        onSuccess();
      }
      return;
    }

    back.classList.remove("hidden");
    back.innerHTML = "";
    back.style.display = "flex";
    back.style.alignItems = "center";
    back.style.justifyContent = "center";
    back.style.padding = "16px";

    const card = document.createElement("div");
    card.className = "adminCard";
    card.style.width = "min(520px, 100%)";

    const t = document.createElement("div");
    t.className = "adminTitle";
    t.textContent = "Admin Lock";

    const hint = document.createElement("div");
    hint.className = "hint small";
    hint.textContent = "Enter the password to open the Edit tab.";

    const input = document.createElement("input");
    input.className = "input";
    input.type = "password";
    input.placeholder = "Password";

    const row = document.createElement("div");
    row.className = "editBtns";

    const unlock = document.createElement("button");
    unlock.className = "btn ghost";
    unlock.textContent = "Unlock";

    const cancel = document.createElement("button");
    cancel.className = "btn ghost";
    cancel.textContent = "Cancel";

    const msg = document.createElement("div");
    msg.className = "hint small";
    msg.style.marginTop = "8px";

    const close = () => {
      back.classList.add("hidden");
      back.innerHTML = "";
      back.style.display = "";
      back.style.alignItems = "";
      back.style.justifyContent = "";
      back.style.padding = "";
    };

    const doUnlock = () => {
      const val = String(input.value || "");
      if (val === ADMIN_PASSWORD) {
        setAdminAuthed(true);
        close();
        onSuccess();
      } else {
        msg.textContent = "Wrong password.";
      }
    };

    unlock.addEventListener("click", doUnlock);
    cancel.addEventListener("click", close);
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doUnlock();
      if (e.key === "Escape") close();
    });

    row.appendChild(unlock);
    row.appendChild(cancel);

    card.appendChild(t);
    card.appendChild(hint);
    card.appendChild(input);
    card.appendChild(row);
    card.appendChild(msg);

    back.appendChild(card);
    input.focus();
  }

  function bindNav() {
    for (const btn of dom.navBtns) {
      btn.addEventListener("click", () => {
        const nav = btn.getAttribute("data-nav");
        if (!nav) return;

        if (nav === "edit") {
          if (isAdminAuthed()) showOnly("edit");
          else openAdminPrompt(() => showOnly("edit"));
          return;
        }

        showOnly(nav);
      });
    }
  }

  /*****************************************************************
   * 9) TRADING / PORTFOLIO
   *****************************************************************/
  function getFolder() {
    const f = state.ui.folder;
    if (!FOLDERS.includes(f)) state.ui.folder = "J";
    if (!state.folders[state.ui.folder]) state.folders[state.ui.folder] = { cash: DEFAULT_CASH, holdings: {} };
    return state.folders[state.ui.folder];
  }

  function ownedQty(id) {
    const fol = getFolder();
    return Math.max(0, Math.floor(nnum(fol.holdings?.[id], 0)));
  }

  function setOwned(id, qty) {
    const fol = getFolder();
    const q = Math.max(0, Math.floor(nnum(qty, 0)));
    if (!fol.holdings) fol.holdings = {};
    if (q <= 0) delete fol.holdings[id];
    else fol.holdings[id] = q;
  }

  function buy(id, qty) {
    ensureStock(id);
    const fol = getFolder();
    const st = state.stocks[id];
    const q = Math.max(1, Math.floor(nnum(qty, 1)));

    const cost = st.price * q;
    if (fol.cash < cost) return false;

    fol.cash -= cost;
    setOwned(id, ownedQty(id) + q);
    persist();
    renderAll();
    return true;
  }

  function sell(id, qty) {
    ensureStock(id);
    const fol = getFolder();
    const st = state.stocks[id];
    const q = Math.max(1, Math.floor(nnum(qty, 1)));

    const have = ownedQty(id);
    if (have <= 0) return false;

    const take = Math.min(have, q);
    fol.cash += st.price * take;
    setOwned(id, have - take);
    persist();
    renderAll();
    return true;
  }

  function holdingsValue() {
    const fol = getFolder();
    let total = 0;
    for (const [id, qty] of Object.entries(fol.holdings || {})) {
      const st = state.stocks[id];
      if (!st) continue;
      total += st.price * Math.max(0, nnum(qty, 0));
    }
    return total;
  }

  /*****************************************************************
   * 10) STOCK ENGINE (SIM)
   *****************************************************************/
  let simTimer = null;

  function tickOnce() {
    const chars = getAllCharacters();
    const gVol = clamp(nnum(dom.globalVol?.value, 1), 0, 1000);

    for (const ch of chars) {
      ensureStock(ch.id);
      const st = state.stocks[ch.id];
      if (!st) continue;

      const prev = st.price;

      if (st.frozen || st.volatility <= 0 || gVol <= 0) {
        st.lastDelta = 0;
        st.history.push(prev);
        st.history = st.history.slice(-120);
        continue;
      }

      const v = clamp(nnum(st.volatility, 1) * gVol, 0, 1000);
      const scale = Math.max(1, prev * 0.006) * v;
      const delta = (Math.random() - 0.5) * 2 * scale;

      let next = prev + delta;
      next = Math.max(0, next);
      next = Math.min(next, st.cap);

      st.price = next;
      st.lastDelta = prev > 0 ? ((next - prev) / prev) * 100 : 0;

      st.history.push(next);
      st.history = st.history.slice(-120);

      // keep cap >= price always
      st.cap = Math.max(st.cap, st.price);
    }

    state.day += 1;
    persist();
    renderAll();
  }

  function startSim() {
    stopSim();
    const ms = Math.max(50, Math.floor(nnum(dom.speedSelect?.value, 1000)));
    simTimer = setInterval(tickOnce, ms);
  }

  function stopSim() {
    if (simTimer) clearInterval(simTimer);
    simTimer = null;
  }

  function bindSim() {
    dom.playBtn?.addEventListener("click", startSim);
    dom.pauseBtn?.addEventListener("click", stopSim);
    dom.step1Btn?.addEventListener("click", () => { stopSim(); tickOnce(); });
    dom.step10Btn?.addEventListener("click", () => { stopSim(); for (let i=0;i<10;i++) tickOnce(); });

    dom.speedSelect?.addEventListener("change", () => {
      if (simTimer) startSim();
    });
  }

  /*****************************************************************
   * 11) MODAL (DETAILS)
   *****************************************************************/
  function closeDetail() {
    dom.modalBackdrop?.classList.add("hidden");
    dom.detailModal?.classList.add("hidden");
  }

  function drawSpark(history) {
    const c = dom.spark;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);

    if (!history || history.length < 2) return;

    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = Math.max(1e-6, max - min);

    ctx.globalAlpha = 0.25;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const x = (i / (history.length - 1)) * (w - 2) + 1;
      const y = h - 1 - ((history[i] - min) / range) * (h - 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function openDetail(id) {
    const ch = getCharById(id);
    if (!ch) return;
    ensureStock(id);

    const st = state.stocks[id];
    const media = getMedia(id);

    const back = dom.modalBackdrop, modal = dom.detailModal;
    if (!back || !modal) return;

    back.classList.remove("hidden");
    modal.classList.remove("hidden");

    dom.modalImg && (dom.modalImg.src = media.image || "");
    dom.modalTitle && (dom.modalTitle.textContent = ch.name);
    dom.modalSub && (dom.modalSub.textContent = `${ch.type} • ${ch.id}`);
    dom.modalPrice && (dom.modalPrice.textContent = `Price: ${money(st.price)}`);
    dom.modalOwned && (dom.modalOwned.textContent = `Owned: ${money(ownedQty(id))}`);
    dom.modalCap && (dom.modalCap.textContent = `Cap: ${money(st.cap)}`);
    dom.modalFrozen && (dom.modalFrozen.textContent = `Status: ${st.frozen ? "FROZEN" : "LIVE"}`);

    const potential = st.cap > 0 ? clamp(((st.cap - st.price) / st.cap) * 100, 0, 100) : 0;
    const pop = clamp(Math.abs(st.lastDelta) * 8, 0, 100);

    dom.modalPotential && (dom.modalPotential.textContent = `Potential: ${pct(potential)}`);
    dom.modalPop && (dom.modalPop.textContent = `Popularity: ${pct(pop)}`);

    drawSpark(st.history);

    if (dom.historyList) {
      dom.historyList.innerHTML = "";
      const list = document.createElement("div");
      list.className = "historyList";
      const slice = st.history.slice(-12);
      for (let i = 0; i < slice.length; i++) {
        const row = document.createElement("div");
        row.className = "hRow";
        row.innerHTML = `<span>t-${slice.length - 1 - i}</span><b>${money(slice[i])}</b>`;
        list.appendChild(row);
      }
      dom.historyList.appendChild(list);
    }

    dom.modalBuyBtn && (dom.modalBuyBtn.onclick = () => buy(id, 1));
    dom.modalSellBtn && (dom.modalSellBtn.onclick = () => sell(id, 1));

    if (dom.modalLinkBtn) {
      dom.modalLinkBtn.textContent = media.link ? "Open Dossier" : "No Link";
      dom.modalLinkBtn.href = media.link || "#";
      dom.modalLinkBtn.style.pointerEvents = media.link ? "auto" : "none";
      dom.modalLinkBtn.style.opacity = media.link ? "1" : "0.5";
    }

    // keep selected synced to wanted
    state.ui.selectedId = id;
    persist();
    renderWanted();
  }

  function bindModal() {
    dom.closeModalBtn?.addEventListener("click", closeDetail);
    dom.modalBackdrop?.addEventListener("click", (e) => {
      if (e.target === dom.modalBackdrop) closeDetail();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDetail();
    });
  }

  /*****************************************************************
   * 12) MARKET GRID + FILTERS + BULK (defaults to mono)
   *****************************************************************/
  let bulkBar = null;
  let bulkToggleBtn = null;
  let bulkCountEl = null;
  let qtyInput = null;
  let bulkBuyBtn = null;
  let bulkSellBtn = null;
  let bulkClearBtn = null;

  function ensureBulkBar() {
    if (!dom.marketPanel) return;
    const filters = $(".filters", dom.marketPanel);
    if (!filters) return;

    if (bulkBar) return;

    bulkBar = document.createElement("div");
    bulkBar.className = "bulkBar";

    const left = document.createElement("div");
    left.className = "bulkLeft";

    bulkToggleBtn = document.createElement("button");
    bulkToggleBtn.className = "btn ghost";
    bulkToggleBtn.textContent = "Bulk: OFF";

    bulkCountEl = document.createElement("div");
    bulkCountEl.className = "bulkCount";
    bulkCountEl.textContent = "Selected: 0";

    const qtyWrap = document.createElement("div");
    qtyWrap.className = "qtyMini";

    const qtyLab = document.createElement("label");
    qtyLab.textContent = "Qty";

    qtyInput = document.createElement("input");
    qtyInput.id = "qtyInput";
    qtyInput.className = "input";
    qtyInput.type = "number";
    qtyInput.step = "1";
    qtyInput.min = "1";
    qtyInput.value = String(state.ui.bulkQty || 1);

    qtyWrap.appendChild(qtyLab);
    qtyWrap.appendChild(qtyInput);

    left.appendChild(bulkToggleBtn);
    left.appendChild(bulkCountEl);
    left.appendChild(qtyWrap);

    const right = document.createElement("div");
    right.className = "bulkRight";

    bulkBuyBtn = document.createElement("button");
    bulkBuyBtn.className = "btn buy";
    bulkBuyBtn.textContent = "Buy Selected";

    bulkSellBtn = document.createElement("button");
    bulkSellBtn.className = "btn sell";
    bulkSellBtn.textContent = "Sell Selected";

    bulkClearBtn = document.createElement("button");
    bulkClearBtn.className = "btn ghost";
    bulkClearBtn.textContent = "Clear";

    right.appendChild(bulkBuyBtn);
    right.appendChild(bulkSellBtn);
    right.appendChild(bulkClearBtn);

    bulkBar.appendChild(left);
    bulkBar.appendChild(right);

    filters.insertAdjacentElement("afterend", bulkBar);

    bulkToggleBtn.addEventListener("click", () => {
      state.ui.bulkMode = !state.ui.bulkMode;
      if (!state.ui.bulkMode) state.ui.bulkSelected = [];
      persist();
      renderMarket();
    });

    qtyInput.addEventListener("change", () => {
      state.ui.bulkQty = clamp(nnum(qtyInput.value, 1), 1, 1e6);
      qtyInput.value = String(state.ui.bulkQty);
      persist();
    });

    bulkClearBtn.addEventListener("click", () => {
      state.ui.bulkSelected = [];
      persist();
      renderMarket();
    });

    bulkBuyBtn.addEventListener("click", () => {
      const q = clamp(nnum(state.ui.bulkQty, 1), 1, 1e6);
      const ids = Array.from(new Set(state.ui.bulkSelected || []));
      for (const id of ids) buy(id, q);
      // keep selection after purchase
      renderMarket();
    });

    bulkSellBtn.addEventListener("click", () => {
      const q = clamp(nnum(state.ui.bulkQty, 1), 1, 1e6);
      const ids = Array.from(new Set(state.ui.bulkSelected || []));
      for (const id of ids) sell(id, q);
      renderMarket();
    });
  }

  function toggleBulkPick(id) {
    const set = new Set(state.ui.bulkSelected || []);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    state.ui.bulkSelected = Array.from(set);
  }

  function getFilterOptions(chars) {
    // arcs from tags (numbers)
    const arcs = new Set();
    const types = new Set();
    for (const c of chars) {
      (c.tags || []).forEach(t => arcs.add(String(t)));
      types.add(String(c.type || "unknown"));
    }
    return {
      arcs: Array.from(arcs).sort((a,b)=>Number(a)-Number(b)),
      types: Array.from(types).sort()
    };
  }

  function ensureFilterSelects() {
    const chars = getAllCharacters();
    const { arcs, types } = getFilterOptions(chars);

    // Arc select
    if (dom.arcSelect && dom.arcSelect.options.length === 0) {
      dom.arcSelect.innerHTML = "";
      const all = document.createElement("option");
      all.value = "";
      all.textContent = "All Arcs";
      dom.arcSelect.appendChild(all);

      for (const a of arcs) {
        const opt = document.createElement("option");
        opt.value = a;
        opt.textContent = `Arc ${a}`;
        dom.arcSelect.appendChild(opt);
      }
    }

    // Type select
    if (dom.typeSelect && dom.typeSelect.options.length === 0) {
      dom.typeSelect.innerHTML = "";
      const all = document.createElement("option");
      all.value = "";
      all.textContent = "All Types";
      dom.typeSelect.appendChild(all);

      for (const t of types) {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        dom.typeSelect.appendChild(opt);
      }
    }

    // Sort select
    if (dom.sortSelect && dom.sortSelect.options.length === 0) {
      dom.sortSelect.innerHTML = "";
      const opts = [
        ["name_az", "Name A–Z"],
        ["price_hi", "Price (High)"],
        ["price_lo", "Price (Low)"],
        ["chg_hi", "Change (High)"],
        ["chg_lo", "Change (Low)"],
      ];
      for (const [v, txt] of opts) {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = txt;
        dom.sortSelect.appendChild(o);
      }
      dom.sortSelect.value = "name_az";
    }

    dom.searchInput?.addEventListener("input", renderMarket);
    dom.arcSelect?.addEventListener("change", renderMarket);
    dom.typeSelect?.addEventListener("change", renderMarket);
    dom.sortSelect?.addEventListener("change", renderMarket);
  }

  function renderMarket() {
    ensureBulkBar();

    const chars = getAllCharacters();

    // keep selected valid
    if (!getCharById(state.ui.selectedId)) state.ui.selectedId = chars[0]?.id || "";

    const q = String(dom.searchInput?.value || "").trim().toLowerCase();
    const arc = String(dom.arcSelect?.value || "");
    const type = String(dom.typeSelect?.value || "");
    const sort = String(dom.sortSelect?.value || "name_az");

    let list = chars.slice();

    if (q) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        String(c.type || "").toLowerCase().includes(q)
      );
    }
    if (arc) {
      list = list.filter(c => (c.tags || []).map(String).includes(arc));
    }
    if (type) {
      list = list.filter(c => String(c.type) === type);
    }

    // sort
    list.sort((a, b) => {
      ensureStock(a.id);
      ensureStock(b.id);
      const sa = state.stocks[a.id], sb = state.stocks[b.id];

      if (sort === "price_hi") return (sb?.price ?? 0) - (sa?.price ?? 0);
      if (sort === "price_lo") return (sa?.price ?? 0) - (sb?.price ?? 0);
      if (sort === "chg_hi") return (sb?.lastDelta ?? 0) - (sa?.lastDelta ?? 0);
      if (sort === "chg_lo") return (sa?.lastDelta ?? 0) - (sb?.lastDelta ?? 0);

      return a.name.localeCompare(b.name);
    });

    if (dom.resultCount) dom.resultCount.textContent = String(list.length);

    if (!dom.marketGrid) return;
    dom.marketGrid.innerHTML = "";

    // bulk bar status
    if (bulkToggleBtn) bulkToggleBtn.textContent = `Bulk: ${state.ui.bulkMode ? "ON" : "OFF"}`;
    if (bulkCountEl) bulkCountEl.textContent = `Selected: ${(state.ui.bulkSelected || []).length}`;
    if (qtyInput) qtyInput.value = String(state.ui.bulkQty || 1);

    for (const ch of list) {
      ensureStock(ch.id);
      const st = state.stocks[ch.id];
      const media = getMedia(ch.id);
      const owned = ownedQty(ch.id);
      const isPicked = (state.ui.bulkSelected || []).includes(ch.id);

      const card = document.createElement("div");
      card.className = "card";
      if (isPicked) card.classList.add("selected");

      const top = document.createElement("div");
      top.className = "cardTop";

      const img = document.createElement("img");
      img.className = "cardImg";
      img.alt = ch.name;
      if (media.image) img.src = media.image;
      top.appendChild(img);

      // pick checkbox (bulk mode only)
      if (state.ui.bulkMode) {
        const pick = document.createElement("div");
        pick.className = "pickBox";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = isPicked;

        const lab = document.createElement("span");
        lab.textContent = "Pick";

        pick.appendChild(cb);
        pick.appendChild(lab);
        top.appendChild(pick);

        cb.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleBulkPick(ch.id);
          persist();
          renderMarket();
        });
      }

      const divider = document.createElement("div");
      divider.className = "cardDivider";

      const body = document.createElement("div");
      body.className = "cardBody";

      const row = document.createElement("div");
      row.className = "cardRow";

      const left = document.createElement("div");
      const name = document.createElement("div");
      name.className = "cardName";
      name.textContent = ch.name;

      const ownedEl = document.createElement("div");
      ownedEl.className = "cardOwned";
      ownedEl.textContent = `Owned: ${money(owned)}`;

      left.appendChild(name);
      left.appendChild(ownedEl);

      const right = document.createElement("div");
      const ticker = document.createElement("div");
      ticker.className = "ticker";
      ticker.textContent = ch.id;

      const delta = document.createElement("div");
      delta.className = "delta " + ((st.lastDelta >= 0) ? "good" : "bad");
      delta.textContent = (st.lastDelta >= 0 ? "+" : "") + pct(st.lastDelta);

      right.appendChild(ticker);
      right.appendChild(delta);

      row.appendChild(left);
      row.appendChild(right);

      const price = document.createElement("div");
      price.className = "cardPrice";
      price.textContent = `Price: ${money(st.price)}`;

      const btns = document.createElement("div");
      btns.className = "cardBtns";

      const buyBtn = document.createElement("button");
      buyBtn.className = "btn buy";
      buyBtn.textContent = "Buy";
      buyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        buy(ch.id, 1);
      });

      const sellBtn = document.createElement("button");
      sellBtn.className = "btn sell";
      sellBtn.textContent = "Sell";
      sellBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sell(ch.id, 1);
      });

      btns.appendChild(buyBtn);
      btns.appendChild(sellBtn);

      body.appendChild(row);
      body.appendChild(price);
      body.appendChild(btns);

      card.appendChild(top);
      card.appendChild(divider);
      card.appendChild(body);

      card.addEventListener("click", () => {
        if (state.ui.bulkMode) {
          toggleBulkPick(ch.id);
          persist();
          renderMarket();
        } else {
          openDetail(ch.id);
        }
      });

      dom.marketGrid.appendChild(card);
    }
  }

  /*****************************************************************
   * 13) WANTED PANEL
   *****************************************************************/
  function renderWanted() {
    const id = state.ui.selectedId;
    const ch = getCharById(id);
    if (!ch) return;
    ensureStock(id);

    const st = state.stocks[id];
    const media = getMedia(id);

    if (dom.wantedImg) dom.wantedImg.src = media.image || "";
    if (dom.wantedName) dom.wantedName.textContent = ch.name;
    if (dom.wantedRole) dom.wantedRole.textContent = `${ch.type} • ${ch.id}`;

    if (dom.wantedPrice) dom.wantedPrice.textContent = money(st.price);
    if (dom.wantedOwned) dom.wantedOwned.textContent = money(ownedQty(id));
    if (dom.wantedCap) dom.wantedCap.textContent = money(st.cap);
    if (dom.wantedFrozen) dom.wantedFrozen.textContent = st.frozen ? "FROZEN" : "LIVE";

    const potential = st.cap > 0 ? clamp(((st.cap - st.price) / st.cap) * 100, 0, 100) : 0;
    const pop = clamp(Math.abs(st.lastDelta) * 8, 0, 100);

    if (dom.wantedPot) dom.wantedPot.textContent = pct(potential);
    if (dom.wantedPop) dom.wantedPop.textContent = pct(pop);

    dom.wantedBuyBtn && (dom.wantedBuyBtn.onclick = () => buy(id, 1));
    dom.wantedSellBtn && (dom.wantedSellBtn.onclick = () => sell(id, 1));

    if (dom.wantedLinkBtn) {
      dom.wantedLinkBtn.href = media.link || "#";
      dom.wantedLinkBtn.textContent = media.link ? "Open Dossier" : "No Dossier";
      dom.wantedLinkBtn.style.pointerEvents = media.link ? "auto" : "none";
      dom.wantedLinkBtn.style.opacity = media.link ? "1" : "0.5";
      dom.wantedLinkBtn.rel = "noopener noreferrer";
    }
  }

  /*****************************************************************
   * 14) PORTFOLIO PANEL
   *****************************************************************/
  function renderPortfolio() {
    const fol = getFolder();
    const hv = holdingsValue();
    const cash = nnum(fol.cash, 0);
    const net = cash + hv;

    const holdingsEntries = Object.entries(fol.holdings || {}).filter(([,q]) => nnum(q,0) > 0);
    const positions = holdingsEntries.length;

    dom.positionsCount && (dom.positionsCount.textContent = String(positions));
    dom.holdingsValue && (dom.holdingsValue.textContent = money(hv));
    dom.cashValue && (dom.cashValue.textContent = money(cash));

    if (dom.positionsList) {
      dom.positionsList.innerHTML = "";
      for (const [id, q] of holdingsEntries) {
        const ch = getCharById(id);
        if (!ch) continue;
        ensureStock(id);
        const st = state.stocks[id];

        const row = document.createElement("div");
        row.className = "posRow";

        const left = document.createElement("div");
        const nm = document.createElement("div");
        nm.className = "posName";
        nm.textContent = ch.name;

        const meta = document.createElement("div");
        meta.className = "posMeta";
        meta.textContent = `${id} • qty ${money(q)}`;

        left.appendChild(nm);
        left.appendChild(meta);

        const right = document.createElement("div");
        right.className = "posValue";
        right.textContent = money(st.price * nnum(q, 0));

        row.appendChild(left);
        row.appendChild(right);

        row.addEventListener("click", () => {
          state.ui.selectedId = id;
          persist();
          renderWanted();
          openDetail(id);
        });

        dom.positionsList.appendChild(row);
      }
    }

    // topbar numbers
    dom.dayEl && (dom.dayEl.textContent = String(state.day));
    dom.balanceEl && (dom.balanceEl.textContent = money(cash));
    dom.netWorthEl && (dom.netWorthEl.textContent = money(net));
  }

  function bindResetPortfolio() {
    dom.resetAllBtn?.addEventListener("click", () => {
      const fol = getFolder();
      fol.cash = DEFAULT_CASH;
      fol.holdings = {};
      persist();
      renderAll();
    });
  }

  /*****************************************************************
   * 15) MOVERS
   *****************************************************************/
  function renderMovers() {
    const chars = getAllCharacters();
    const rows = chars.map(ch => {
      ensureStock(ch.id);
      const st = state.stocks[ch.id];
      return { id: ch.id, name: ch.name, delta: nnum(st?.lastDelta, 0) };
    });

    rows.sort((a,b) => b.delta - a.delta);
    const gainers = rows.slice(0, 6);
    const losers = rows.slice(-6).reverse();

    const renderList = (root, list) => {
      if (!root) return;
      root.innerHTML = "";
      for (const r of list) {
        const row = document.createElement("div");
        row.className = "watchRow";

        const nm = document.createElement("div");
        nm.className = "watchName";
        nm.textContent = r.name;

        const d = document.createElement("div");
        d.className = "watchDelta " + (r.delta >= 0 ? "good" : "bad");
        d.textContent = (r.delta >= 0 ? "+" : "") + pct(r.delta);

        row.appendChild(nm);
        row.appendChild(d);

        row.addEventListener("click", () => {
          state.ui.selectedId = r.id;
          persist();
          renderWanted();
          openDetail(r.id);
        });

        root.appendChild(row);
      }
    };

    renderList(dom.gainersList, gainers);
    renderList(dom.losersList, losers);
  }

  /*****************************************************************
   * 16) PROJECTS TAB = FOLDERS (J/M/B/K/R)
   *****************************************************************/
  function renderFolders() {
    if (!dom.projectsGrid) return;

    dom.projectsGrid.innerHTML = "";

    for (const f of FOLDERS) {
      const card = document.createElement("div");
      card.className = "card";

      const top = document.createElement("div");
      top.className = "cardTop";
      top.style.display = "grid";
      top.style.placeItems = "center";
      top.style.fontWeight = "1000";
      top.style.fontSize = "22px";
      top.textContent = f;

      const divider = document.createElement("div");
      divider.className = "cardDivider";

      const body = document.createElement("div");
      body.className = "cardBody";

      const fol = state.folders[f] || { cash: DEFAULT_CASH, holdings: {} };
      const hv = (() => {
        let total = 0;
        for (const [id, qty] of Object.entries(fol.holdings || {})) {
          const st = state.stocks[id];
          if (!st) continue;
          total += st.price * nnum(qty, 0);
        }
        return total;
      })();
      const net = nnum(fol.cash, 0) + hv;

      const name = document.createElement("div");
      name.className = "cardName";
      name.textContent = `Folder ${f}` + (state.ui.folder === f ? " (ACTIVE)" : "");

      const owned = document.createElement("div");
      owned.className = "cardOwned";
      owned.textContent = `Cash: ${money(fol.cash)} • Net: ${money(net)}`;

      const btns = document.createElement("div");
      btns.className = "cardBtns";

      const selBtn = document.createElement("button");
      selBtn.className = "btn buy";
      selBtn.textContent = "Use Folder";
      selBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.ui.folder = f;
        persist();
        renderAll();
      });

      const resetBtn = document.createElement("button");
      resetBtn.className = "btn ghost";
      resetBtn.textContent = "Reset";
      resetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
        persist();
        renderAll();
      });

      btns.appendChild(selBtn);
      btns.appendChild(resetBtn);

      body.appendChild(name);
      body.appendChild(owned);
      body.appendChild(btns);

      card.appendChild(top);
      card.appendChild(divider);
      card.appendChild(body);

      card.addEventListener("click", () => {
        state.ui.folder = f;
        persist();
        renderAll();
      });

      dom.projectsGrid.appendChild(card);
    }
  }

  /*****************************************************************
   * 17) EDIT TAB (MEDIA EDIT + ADMIN PANEL)
   *****************************************************************/
  let adminInjected = false;

  function populateEditSelect() {
    if (!dom.editCharSelect) return;
    const chars = getAllCharacters().slice().sort((a,b)=>a.name.localeCompare(b.name));
    dom.editCharSelect.innerHTML = "";
    for (const ch of chars) {
      const opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = `${ch.name} (${ch.id})`;
      dom.editCharSelect.appendChild(opt);
    }
    const sel = getCharById(state.ui.selectedId) ? state.ui.selectedId : chars[0]?.id || "";
    if (sel) dom.editCharSelect.value = sel;
  }

  function loadEditFieldsFromSelected() {
    const id = dom.editCharSelect?.value || state.ui.selectedId;
    if (!id) return;
    state.ui.selectedId = id;

    const media = getMedia(id);
    if (dom.editImg) dom.editImg.value = media.image || "";
    if (dom.editLink) dom.editLink.value = media.link || "";

    persist();
    renderWanted();
  }

  function bindEditBase() {
    dom.editCharSelect?.addEventListener("change", () => {
      loadEditFieldsFromSelected();
    });

    dom.saveEditBtn?.addEventListener("click", () => {
      const id = dom.editCharSelect?.value || "";
      if (!id) return;

      const img = safeUrl(dom.editImg?.value || "");
      const link = safeUrl(dom.editLink?.value || "");

      state.mediaOverrides[id] = { image: img, link };
      persist();
      renderAll();
    });

    dom.resetEditBtn?.addEventListener("click", () => {
      const id = dom.editCharSelect?.value || "";
      if (!id) return;
      delete state.mediaOverrides[id];
      persist();
      loadEditFieldsFromSelected();
      renderAll();
    });

    dom.applyBulkBtn?.addEventListener("click", () => {
      let obj;
      try {
        obj = JSON.parse(dom.bulkJson?.value || "{}");
      } catch {
        alert("Bulk JSON invalid.");
        return;
      }
      if (!obj || typeof obj !== "object") {
        alert("Bulk JSON must be an object: { id: {image, link}, ... }");
        return;
      }
      for (const [id, v] of Object.entries(obj)) {
        if (!v || typeof v !== "object") continue;
        const img = safeUrl(v.image || "");
        const link = safeUrl(v.link || "");
        state.mediaOverrides[id] = { image: img, link };
      }
      persist();
      renderAll();
      loadEditFieldsFromSelected();
    });
  }

  function injectAdminPanel() {
    if (!dom.editPanel || adminInjected) return;

    const wrap = document.createElement("div");
    wrap.className = "adminWrap";

    const head = document.createElement("div");
    head.className = "projectsHead";

    const title = document.createElement("div");
    title.className = "projectsTitle";
    title.textContent = "Admin Panel";

    const hint = document.createElement("div");
    hint.className = "projectsHint";
    hint.textContent = "Cheats: cash, holdings, volatility, freeze, cap, add/remove characters.";

    head.appendChild(title);
    head.appendChild(hint);

    const lockRow = document.createElement("div");
    lockRow.className = "editBtns";

    const lockBtn = document.createElement("button");
    lockBtn.className = "btn ghost";
    lockBtn.textContent = "Lock (log out)";
    lockBtn.addEventListener("click", () => {
      setAdminAuthed(false);
      showOnly("market");
    });

    lockRow.appendChild(lockBtn);

    const grid = document.createElement("div");
    grid.className = "adminGrid";

    const mkCard = (cardTitle) => {
      const c = document.createElement("div");
      c.className = "adminCard";
      const t = document.createElement("div");
      t.className = "adminTitle";
      t.textContent = cardTitle;
      c.appendChild(t);
      return c;
    };

    // Card: Folder Cash
    const cashCard = mkCard("Folder Cash");
    const folSel = document.createElement("select");
    folSel.className = "select full";
    for (const f of FOLDERS) {
      const o = document.createElement("option");
      o.value = f; o.textContent = f;
      folSel.appendChild(o);
    }
    folSel.value = state.ui.folder;

    const cashNow = document.createElement("div");
    cashNow.className = "hint small";

    const refreshCashNow = () => {
      const f = folSel.value;
      const fol = state.folders[f] || { cash: DEFAULT_CASH, holdings: {} };
      cashNow.textContent = `Current cash in ${f}: ${money(fol.cash)}`;
    };
    refreshCashNow();
    folSel.addEventListener("change", refreshCashNow);

    const addCash = document.createElement("input");
    addCash.className = "input";
    addCash.type = "number";
    addCash.step = "1";
    addCash.placeholder = "Add cash (e.g. 999999)";

    const addCashBtn = document.createElement("button");
    addCashBtn.className = "btn buy full";
    addCashBtn.textContent = "Give Cash";
    addCashBtn.addEventListener("click", () => {
      const f = folSel.value;
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      state.folders[f].cash = Math.max(0, nnum(state.folders[f].cash, 0) + nnum(addCash.value, 0));
      addCash.value = "";
      persist();
      refreshCashNow();
      renderAll();
    });

    const setCash = document.createElement("input");
    setCash.className = "input";
    setCash.type = "number";
    setCash.step = "1";
    setCash.placeholder = "Set cash (absolute)";

    const setCashBtn = document.createElement("button");
    setCashBtn.className = "btn ghost full";
    setCashBtn.textContent = "Set Cash";
    setCashBtn.addEventListener("click", () => {
      const f = folSel.value;
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      state.folders[f].cash = Math.max(0, nnum(setCash.value, 0));
      setCash.value = "";
      persist();
      refreshCashNow();
      renderAll();
    });

    cashCard.appendChild(folSel);
    cashCard.appendChild(cashNow);
    cashCard.appendChild(addCash);
    cashCard.appendChild(addCashBtn);
    cashCard.appendChild(setCash);
    cashCard.appendChild(setCashBtn);

    // Card: Holdings
    const holdCard = mkCard("Holdings (Free Stocks)");
    const holdFolSel = folSel.cloneNode(true);
    holdFolSel.value = state.ui.folder;

    const holdCharSel = document.createElement("select");
    holdCharSel.className = "select full";

    const fillHoldCharSel = () => {
      const chars = getAllCharacters().slice().sort((a,b)=>a.name.localeCompare(b.name));
      holdCharSel.innerHTML = "";
      for (const ch of chars) {
        const o = document.createElement("option");
        o.value = ch.id;
        o.textContent = `${ch.name} (${ch.id})`;
        holdCharSel.appendChild(o);
      }
      holdCharSel.value = state.ui.selectedId || chars[0]?.id || "";
    };
    fillHoldCharSel();

    const holdNow = document.createElement("div");
    holdNow.className = "hint small";

    const refreshHoldNow = () => {
      const f = holdFolSel.value;
      const id = holdCharSel.value;
      const fol = state.folders[f] || { cash: DEFAULT_CASH, holdings: {} };
      holdNow.textContent = `Owned in ${f}: ${money(fol.holdings?.[id] || 0)}`;
    };
    refreshHoldNow();
    holdFolSel.addEventListener("change", refreshHoldNow);
    holdCharSel.addEventListener("change", refreshHoldNow);

    const qty = document.createElement("input");
    qty.className = "input";
    qty.type = "number";
    qty.step = "1";
    qty.placeholder = "Qty (e.g. 9999)";

    const addHoldBtn = document.createElement("button");
    addHoldBtn.className = "btn buy full";
    addHoldBtn.textContent = "Add Owned";
    addHoldBtn.addEventListener("click", () => {
      const f = holdFolSel.value;
      const id = holdCharSel.value;
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      if (!state.folders[f].holdings) state.folders[f].holdings = {};
      const cur = Math.max(0, Math.floor(nnum(state.folders[f].holdings[id], 0)));
      state.folders[f].holdings[id] = Math.max(0, cur + Math.floor(nnum(qty.value, 0)));
      qty.value = "";
      persist();
      refreshHoldNow();
      renderAll();
    });

    const setHoldBtn = document.createElement("button");
    setHoldBtn.className = "btn ghost full";
    setHoldBtn.textContent = "Set Owned";
    setHoldBtn.addEventListener("click", () => {
      const f = holdFolSel.value;
      const id = holdCharSel.value;
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      if (!state.folders[f].holdings) state.folders[f].holdings = {};
      state.folders[f].holdings[id] = Math.max(0, Math.floor(nnum(qty.value, 0)));
      qty.value = "";
      persist();
      refreshHoldNow();
      renderAll();
    });

    const clearHoldBtn = document.createElement("button");
    clearHoldBtn.className = "btn sell full";
    clearHoldBtn.textContent = "Clear Owned";
    clearHoldBtn.addEventListener("click", () => {
      const f = holdFolSel.value;
      const id = holdCharSel.value;
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      if (state.folders[f].holdings) delete state.folders[f].holdings[id];
      persist();
      refreshHoldNow();
      renderAll();
    });

    holdCard.appendChild(holdFolSel);
    holdCard.appendChild(holdCharSel);
    holdCard.appendChild(holdNow);
    holdCard.appendChild(qty);
    holdCard.appendChild(addHoldBtn);
    holdCard.appendChild(setHoldBtn);
    holdCard.appendChild(clearHoldBtn);

    // Card: Stock controls
    const stockCard = mkCard("Stock Controls");
    const stockSel = document.createElement("select");
    stockSel.className = "select full";

    const fillStockSel = () => {
      const chars = getAllCharacters().slice().sort((a,b)=>a.name.localeCompare(b.name));
      stockSel.innerHTML = "";
      for (const ch of chars) {
        const o = document.createElement("option");
        o.value = ch.id;
        o.textContent = `${ch.name} (${ch.id})`;
        stockSel.appendChild(o);
      }
      stockSel.value = state.ui.selectedId || chars[0]?.id || "";
    };
    fillStockSel();

    const stNow = document.createElement("div");
    stNow.className = "hint small";

    const volIn = document.createElement("input");
    volIn.className = "input";
    volIn.type = "number";
    volIn.step = "0.1";
    volIn.placeholder = "Volatility (0 = frozen)";

    const priceIn = document.createElement("input");
    priceIn.className = "input";
    priceIn.type = "number";
    priceIn.step = "1";
    priceIn.placeholder = "Set price";

    const capIn = document.createElement("input");
    capIn.className = "input";
    capIn.type = "number";
    capIn.step = "1";
    capIn.placeholder = "Set cap";

    const refreshSt = () => {
      const id = stockSel.value;
      ensureStock(id);
      const st = state.stocks[id];
      if (!st) return;
      stNow.textContent = `Price ${money(st.price)} • Vol ${st.volatility} • Cap ${money(st.cap)} • ${st.frozen ? "FROZEN" : "LIVE"}`;
    };
    refreshSt();
    stockSel.addEventListener("change", refreshSt);

    const applyVolBtn = document.createElement("button");
    applyVolBtn.className = "btn ghost full";
    applyVolBtn.textContent = "Apply Volatility";
    applyVolBtn.addEventListener("click", () => {
      const id = stockSel.value;
      ensureStock(id);
      state.stocks[id].volatility = clamp(nnum(volIn.value, state.stocks[id].volatility), 0, 1000);
      // optional: if they set vol 0, freeze it too
      if (state.stocks[id].volatility <= 0) state.stocks[id].frozen = true;
      persist();
      refreshSt();
      renderAll();
    });

    const setPriceBtn = document.createElement("button");
    setPriceBtn.className = "btn ghost full";
    setPriceBtn.textContent = "Set Price";
    setPriceBtn.addEventListener("click", () => {
      const id = stockSel.value;
      ensureStock(id);
      const st = state.stocks[id];
      st.price = Math.max(0, nnum(priceIn.value, st.price));
      st.cap = Math.max(st.cap, st.price);
      st.history.push(st.price);
      st.history = st.history.slice(-120);
      persist();
      refreshSt();
      renderAll();
    });

    const setCapBtn = document.createElement("button");
    setCapBtn.className = "btn ghost full";
    setCapBtn.textContent = "Set Cap";
    setCapBtn.addEventListener("click", () => {
      const id = stockSel.value;
      ensureStock(id);
      const st = state.stocks[id];
      st.cap = Math.max(nnum(capIn.value, st.cap), st.price);
      persist();
      refreshSt();
      renderAll();
    });

    const toggleFreezeBtn = document.createElement("button");
    toggleFreezeBtn.className = "btn sell full";
    toggleFreezeBtn.textContent = "Toggle Freeze";
    toggleFreezeBtn.addEventListener("click", () => {
      const id = stockSel.value;
      ensureStock(id);
      state.stocks[id].frozen = !state.stocks[id].frozen;
      persist();
      refreshSt();
      renderAll();
    });

    const resetStockBtn = document.createElement("button");
    resetStockBtn.className = "btn buy full";
    resetStockBtn.textContent = "Reset Stock (Default)";
    resetStockBtn.addEventListener("click", () => {
      const id = stockSel.value;
      const ch = getCharById(id);
      if (!ch) return;
      state.stocks[id] = defaultStockForChar(ch);
      persist();
      refreshSt();
      renderAll();
    });

    stockCard.appendChild(stockSel);
    stockCard.appendChild(stNow);
    stockCard.appendChild(volIn);
    stockCard.appendChild(applyVolBtn);
    stockCard.appendChild(priceIn);
    stockCard.appendChild(setPriceBtn);
    stockCard.appendChild(capIn);
    stockCard.appendChild(setCapBtn);
    stockCard.appendChild(toggleFreezeBtn);
    stockCard.appendChild(resetStockBtn);

    // Card: Add / Remove characters
    const charCard = mkCard("Add / Remove Characters");
    const idIn = document.createElement("input");
    idIn.className = "input";
    idIn.placeholder = "id (unique) e.g. new_character";

    const nameIn = document.createElement("input");
    nameIn.className = "input";
    nameIn.placeholder = "Name";

    const typeIn = document.createElement("input");
    typeIn.className = "input";
    typeIn.placeholder = "Type (human/npc/etc)";

    const baseIn = document.createElement("input");
    baseIn.className = "input";
    baseIn.type = "number";
    baseIn.placeholder = "Base price";

    const minIn = document.createElement("input");
    minIn.className = "input";
    minIn.type = "number";
    minIn.placeholder = "Min";

    const maxIn = document.createElement("input");
    maxIn.className = "input";
    maxIn.type = "number";
    maxIn.placeholder = "Max";

    const tagsIn = document.createElement("input");
    tagsIn.className = "input";
    tagsIn.placeholder = "Tags (comma nums) e.g. 1,5";

    const addCharBtn = document.createElement("button");
    addCharBtn.className = "btn buy full";
    addCharBtn.textContent = "Add Character";
    addCharBtn.addEventListener("click", () => {
      const id = String(idIn.value || "").trim();
      const name = String(nameIn.value || "").trim();
      if (!id || !name) return alert("Need id + name.");

      const tags = String(tagsIn.value || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(x => Math.floor(nnum(x, 0)));

      const c = {
        id,
        name,
        type: String(typeIn.value || "custom").trim() || "custom",
        tags,
        stock: 0,
        min: nnum(minIn.value, 0),
        max: nnum(maxIn.value, 0),
        base: nnum(baseIn.value, 0)
      };

      // put into custom (override if exists)
      const idx = (state.customChars || hint).customChars?.findIndex?.(() => -1);
      if (!Array.isArray(state.customChars)) state.customChars = [];
      state.customChars = state.customChars.filter(x => x && x.id !== id);
      state.customChars.push(c);

      // un-remove if previously removed
      state.removedIds = (state.removedIds || []).filter(x => x !== id);

      ensureStock(id);

      persist();
      // refresh selects
      fillHoldCharSel();
      fillStockSel();
      populateEditSelect();
      renderAll();

      idIn.value = ""; nameIn.value = ""; typeIn.value = "";
      baseIn.value = ""; minIn.value = ""; maxIn.value = ""; tagsIn.value = "";
    });

    const remSel = document.createElement("select");
    remSel.className = "select full";
    const fillRemSel = () => {
      const chars = getAllCharacters().slice().sort((a,b)=>a.name.localeCompare(b.name));
      remSel.innerHTML = "";
      for (const ch of chars) {
        const o = document.createElement("option");
        o.value = ch.id;
        o.textContent = `${ch.name} (${ch.id})`;
        remSel.appendChild(o);
      }
      remSel.value = state.ui.selectedId || chars[0]?.id || "";
    };
    fillRemSel();

    const remBtn = document.createElement("button");
    remBtn.className = "btn sell full";
    remBtn.textContent = "Remove Selected Character";
    remBtn.addEventListener("click", () => {
      const id = remSel.value;
      if (!id) return;
      if (!confirm(`Remove ${id}?`)) return;

      if (!Array.isArray(state.removedIds)) state.removedIds = [];
      if (!state.removedIds.includes(id)) state.removedIds.push(id);

      // also clear holdings across folders
      for (const f of FOLDERS) {
        const fol = state.folders[f];
        if (fol && fol.holdings) delete fol.holdings[id];
      }

      persist();
      fillHoldCharSel();
      fillStockSel();
      fillRemSel();
      populateEditSelect();
      renderAll();
    });

    charCard.appendChild(idIn);
    charCard.appendChild(nameIn);
    charCard.appendChild(typeIn);
    charCard.appendChild(baseIn);
    charCard.appendChild(minIn);
    charCard.appendChild(maxIn);
    charCard.appendChild(tagsIn);
    charCard.appendChild(addCharBtn);
    charCard.appendChild(remSel);
    charCard.appendChild(remBtn);

    grid.appendChild(cashCard);
    grid.appendChild(holdCard);
    grid.appendChild(stockCard);
    grid.appendChild(charCard);

    wrap.appendChild(head);
    wrap.appendChild(lockRow);
    wrap.appendChild(grid);

    dom.editPanel.appendChild(wrap);
    adminInjected = true;
  }

  function renderEdit() {
    if (!isAdminAuthed()) {
      // hard stop if someone forces edit visible
      showOnly("market");
      return;
    }
    populateEditSelect();
    loadEditFieldsFromSelected();
    injectAdminPanel();
  }

  /*****************************************************************
   * 18) RENDER ALL
   *****************************************************************/
  function renderAll() {
    // ensure folder exists
    if (!FOLDERS.includes(state.ui.folder)) state.ui.folder = "J";
    if (!state.folders[state.ui.folder]) state.folders[state.ui.folder] = { cash: DEFAULT_CASH, holdings: {} };

    // ensure every char has stock
    for (const ch of getAllCharacters()) ensureStock(ch.id);

    renderWanted();
    renderPortfolio();
    renderMovers();

    if (state.ui.nav === "market") renderMarket();
    else if (state.ui.nav === "projects") renderFolders();
    else if (state.ui.nav === "edit") renderEdit();
  }

  /*****************************************************************
   * 19) BOOT
   *****************************************************************/
  function boot() {
    domSanity();

    // ensure folders exist (5,000 each)
    for (const f of FOLDERS) {
      if (!state.folders[f]) state.folders[f] = { cash: DEFAULT_CASH, holdings: {} };
      if (typeof state.folders[f].cash !== "number") state.folders[f].cash = DEFAULT_CASH;
      if (!state.folders[f].holdings || typeof state.folders[f].holdings !== "object") state.folders[f].holdings = {};
    }

    // selected id safety
    const chars = getAllCharacters();
    if (!getCharById(state.ui.selectedId)) state.ui.selectedId = chars[0]?.id || "";

    // bind
    bindNav();
    bindSim();
    bindModal();
    bindResetPortfolio();
    bindEditBase();

    ensureFilterSelects();

    // Start on whatever nav state says (but enforce lock)
    if (state.ui.nav === "edit" && !isAdminAuthed()) state.ui.nav = "market";
    showOnly(state.ui.nav);

    persist();
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();


