/* ===========================
   FILE NAME MUST BE: app.js
   =========================== */

(() => {
  "use strict";

  /*****************************************************************
   * 0) ADMIN PASSWORD (CHANGE THIS)
   *****************************************************************/
  const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD"; // <-- change it
  const ADMIN_AUTH_KEY = "gb_admin_authed_v1";

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
  const $ = (id) => document.getElementById(id);
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

  function isAdminAuthed(){
    try { return sessionStorage.getItem(ADMIN_AUTH_KEY) === "1"; } catch { return false; }
  }
  function setAdminAuthed(v){
    try { sessionStorage.setItem(ADMIN_AUTH_KEY, v ? "1" : "0"); } catch {}
  }

  function loadJSON(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
  function saveJSON(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  /*****************************************************************
   * 4) STATE + DEFAULTS
   *****************************************************************/
  const KEY_STATE = "gb_state_ui_v1";
  const KEY_MEDIA_OVERRIDES = "gb_media_overrides_v1";
  const KEY_CUSTOM_CHARS = "gb_custom_chars_v1";

  const DEFAULT_CASH = 5000;

  function defaultStockFor(ch){
    const base = nnum(ch.base, 100);
    const min = nnum(ch.min, Math.max(1, base * 0.7));
    const max = nnum(ch.max, base * 1.3);
    const price = clamp(base, min, max);
    const cap = Math.max(max * 2, price);
    const hist = Array.from({ length: 24 }, () => price);
    return {
      price,
      prev: price,
      vol: 1,
      cap,
      frozen: false,
      hist
    };
  }

  const state = (() => {
    const saved = loadJSON(KEY_STATE, null);
    const savedCustom = loadJSON(KEY_CUSTOM_CHARS, []);
    const customChars = Array.isArray(savedCustom) ? savedCustom.filter(x => x && typeof x.id === "string") : [];

    const base = {
      version: 1,
      ui: {
        view: "market",              // market | projects | edit
        selectedId: BASE_CHARACTERS[0]?.id || "",
        search: "",
        arc: "all",
        type: "all",
        sort: "default",
        mode: "mono",                // mono | bulk
        bulkQty: 1,
        bulkSelected: []
      },
      sim: {
        day: 0,
        running: false,
        speedMs: 1000,
        globalVol: 1
      },
      wallet: {
        cash: DEFAULT_CASH,
        holdings: {}                 // id -> qty
      },
      stocks: {},                    // id -> stock obj
      customChars
    };

    // Merge
    const s = (saved && typeof saved === "object") ? saved : {};
    const merged = base;

    // ui
    if (s.ui && typeof s.ui === "object") {
      merged.ui.view = typeof s.ui.view === "string" ? s.ui.view : merged.ui.view;
      merged.ui.selectedId = typeof s.ui.selectedId === "string" ? s.ui.selectedId : merged.ui.selectedId;
      merged.ui.search = typeof s.ui.search === "string" ? s.ui.search : merged.ui.search;
      merged.ui.arc = typeof s.ui.arc === "string" ? s.ui.arc : merged.ui.arc;
      merged.ui.type = typeof s.ui.type === "string" ? s.ui.type : merged.ui.type;
      merged.ui.sort = typeof s.ui.sort === "string" ? s.ui.sort : merged.ui.sort;
      merged.ui.mode = (s.ui.mode === "bulk") ? "bulk" : "mono";
      merged.ui.bulkQty = clamp(nnum(s.ui.bulkQty, 1), 1, 1e9);
      merged.ui.bulkSelected = Array.isArray(s.ui.bulkSelected) ? s.ui.bulkSelected.filter(x => typeof x === "string") : [];
    }

    // sim
    if (s.sim && typeof s.sim === "object") {
      merged.sim.day = Math.max(0, Math.floor(nnum(s.sim.day, merged.sim.day)));
      merged.sim.running = !!s.sim.running;
      merged.sim.speedMs = clamp(nnum(s.sim.speedMs, merged.sim.speedMs), 80, 60000);
      merged.sim.globalVol = clamp(nnum(s.sim.globalVol, merged.sim.globalVol), 0, 1000);
    }

    // wallet
    if (s.wallet && typeof s.wallet === "object") {
      merged.wallet.cash = Math.max(0, nnum(s.wallet.cash, merged.wallet.cash));
      merged.wallet.holdings = (s.wallet.holdings && typeof s.wallet.holdings === "object") ? s.wallet.holdings : merged.wallet.holdings;
    }

    // stocks (will be normalized after we build character list)
    merged.stocks = (s.stocks && typeof s.stocks === "object") ? s.stocks : {};

    return merged;
  })();

  function persist(){
    saveJSON(KEY_STATE, state);
    saveJSON(KEY_CUSTOM_CHARS, state.customChars || []);
  }

  /*****************************************************************
   * 5) CHARACTER LIST (BASE + CUSTOM)
   *****************************************************************/
  function getAllCharacters(){
    const customs = Array.isArray(state.customChars) ? state.customChars : [];
    const cleaned = [];
    const seen = new Set(BASE_CHARACTERS.map(c => c.id));

    for (const c of customs) {
      if (!c || typeof c !== "object") continue;
      const id = String(c.id || "").trim();
      if (!id || seen.has(id)) continue;
      seen.add(id);
      cleaned.push(mk(
        id,
        String(c.name || id),
        String(c.type || "custom"),
        Array.isArray(c.tags) ? c.tags : [],
        nnum(c.stock, 0),
        nnum(c.min, 0),
        nnum(c.max, 0),
        nnum(c.base, 100)
      ));
    }

    return BASE_CHARACTERS.concat(cleaned);
  }

  function normalizeStocks(allChars){
    // ensure holdings keys are numbers
    if (!state.wallet.holdings || typeof state.wallet.holdings !== "object") state.wallet.holdings = {};
    for (const k of Object.keys(state.wallet.holdings)) {
      const v = Math.max(0, Math.floor(nnum(state.wallet.holdings[k], 0)));
      if (!v) delete state.wallet.holdings[k];
      else state.wallet.holdings[k] = v;
    }

    // normalize stocks per character
    if (!state.stocks || typeof state.stocks !== "object") state.stocks = {};
    for (const ch of allChars) {
      const cur = state.stocks[ch.id];
      if (!cur || typeof cur !== "object") {
        state.stocks[ch.id] = defaultStockFor(ch);
        continue;
      }
      const def = defaultStockFor(ch);
      def.price = Math.max(0, nnum(cur.price, def.price));
      def.prev = Math.max(0, nnum(cur.prev, def.price));
      def.vol = clamp(nnum(cur.vol, def.vol), 0, 1000);
      def.cap = Math.max(def.price, nnum(cur.cap, def.cap));
      def.frozen = !!cur.frozen;
      def.hist = Array.isArray(cur.hist) ? cur.hist.map(x => Math.max(0, nnum(x, def.price))).slice(-60) : def.hist;
      if (def.hist.length < 8) def.hist = Array.from({ length: 24 }, () => def.price);
      state.stocks[ch.id] = def;
    }

    // prune stocks for removed customs
    const validIds = new Set(allChars.map(c => c.id));
    for (const id of Object.keys(state.stocks)) {
      if (!validIds.has(id)) delete state.stocks[id];
    }
    for (const id of Object.keys(state.wallet.holdings)) {
      if (!validIds.has(id)) delete state.wallet.holdings[id];
    }

    // ensure selectedId exists
    if (!validIds.has(state.ui.selectedId)) {
      state.ui.selectedId = allChars[0]?.id || "";
    }
  }

  /*****************************************************************
   * 6) MEDIA OVERRIDES (EDIT PANEL)
   *****************************************************************/
  let mediaOverrides = (() => {
    const o = loadJSON(KEY_MEDIA_OVERRIDES, {});
    return (o && typeof o === "object") ? o : {};
  })();

  function saveMediaOverrides(){
    saveJSON(KEY_MEDIA_OVERRIDES, mediaOverrides);
  }

  function getMediaFor(id){
    const ov = mediaOverrides[id];
    const base = entityMedia[id] || {};
    const image = safeUrl((ov && ov.image) || base.image || "");
    const link = safeUrl((ov && ov.link) || base.link || "");
    return { image, link };
  }

  /*****************************************************************
   * 7) DOM REFERENCES (HTML IS FIXED)
   *****************************************************************/
  const el = {
    // nav + panels
    pills: () => $$(".pill[data-nav]"),
    marketPanel: $("marketPanel"),
    projectsPanel: $("projectsPanel"),
    editPanel: $("editPanel"),

    // top stats
    dayEl: $("dayEl"),
    balanceEl: $("balanceEl"),
    netWorthEl: $("netWorthEl"),

    // wanted
    wantedImg: $("wantedImg"),
    wantedName: $("wantedName"),
    wantedRole: $("wantedRole"),
    wantedPrice: $("wantedPrice"),
    wantedOwned: $("wantedOwned"),
    wantedPop: $("wantedPop"),
    wantedPot: $("wantedPot"),
    wantedCap: $("wantedCap"),
    wantedFrozen: $("wantedFrozen"),
    wantedBuyBtn: $("wantedBuyBtn"),
    wantedSellBtn: $("wantedSellBtn"),
    wantedLinkBtn: $("wantedLinkBtn"),

    // portfolio
    positionsCount: $("positionsCount"),
    holdingsValue: $("holdingsValue"),
    cashValue: $("cashValue"),
    positionsList: $("positionsList"),
    resetAllBtn: $("resetAllBtn"),

    // watch
    gainersList: $("gainersList"),
    losersList: $("losersList"),

    // sim
    playBtn: $("playBtn"),
    pauseBtn: $("pauseBtn"),
    step1Btn: $("step1Btn"),
    step10Btn: $("step10Btn"),
    speedSelect: $("speedSelect"),
    globalVol: $("globalVol"),

    // market filters/grid
    searchInput: $("searchInput"),
    arcSelect: $("arcSelect"),
    typeSelect: $("typeSelect"),
    sortSelect: $("sortSelect"),
    resultCount: $("resultCount"),
    marketGrid: $("marketGrid"),

    // projects grid
    projectsGrid: $("projectsGrid"),

    // edit panel (base)
    editCharSelect: $("editCharSelect"),
    editImg: $("editImg"),
    editLink: $("editLink"),
    bulkJson: $("bulkJson"),
    saveEditBtn: $("saveEditBtn"),
    resetEditBtn: $("resetEditBtn"),
    applyBulkBtn: $("applyBulkBtn"),

    // modal
    modalBackdrop: $("modalBackdrop"),
    detailModal: $("detailModal"),
    closeModalBtn: $("closeModalBtn"),
    modalImg: $("modalImg"),
    modalTitle: $("modalTitle"),
    modalSub: $("modalSub"),
    modalPrice: $("modalPrice"),
    modalOwned: $("modalOwned"),
    modalPotential: $("modalPotential"),
    modalPop: $("modalPop"),
    modalCap: $("modalCap"),
    modalFrozen: $("modalFrozen"),
    spark: $("spark"),
    historyList: $("historyList"),
    modalBuyBtn: $("modalBuyBtn"),
    modalSellBtn: $("modalSellBtn"),
    modalLinkBtn: $("modalLinkBtn"),
  };

  /*****************************************************************
   * 8) NOTIFY (small toast)
   *****************************************************************/
  let toastTimer = null;
  function notify(msg){
    try{
      let box = document.getElementById("gbToast");
      if (!box) {
        box = document.createElement("div");
        box.id = "gbToast";
        box.style.position = "fixed";
        box.style.left = "50%";
        box.style.bottom = "18px";
        box.style.transform = "translateX(-50%)";
        box.style.padding = "10px 12px";
        box.style.border = "1px solid rgba(255,255,255,.18)";
        box.style.borderRadius = "12px";
        box.style.background = "rgba(0,0,0,.55)";
        box.style.backdropFilter = "blur(10px)";
        box.style.color = "#eaf2ff";
        box.style.fontWeight = "900";
        box.style.zIndex = "999999";
        box.style.maxWidth = "min(920px, calc(100vw - 24px))";
        box.style.textAlign = "center";
        box.style.pointerEvents = "none";
        box.style.opacity = "0";
        box.style.transition = "opacity .15s ease";
        document.body.appendChild(box);
      }
      box.textContent = String(msg || "");
      box.style.opacity = "1";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { box.style.opacity = "0"; }, 1300);
    } catch {}
  }

  /*****************************************************************
   * 9) VIEW / NAV
   *****************************************************************/
  function setView(view){
    state.ui.view = view;
    persist();
    renderView();
  }

  function renderView(){
    const view = state.ui.view;

    // update nav active class
    for (const b of el.pills()) {
      b.classList.toggle("active", b.dataset.nav === view);
    }

    // panels
    if (el.marketPanel) el.marketPanel.classList.toggle("hidden", view !== "market");
    if (el.projectsPanel) el.projectsPanel.classList.toggle("hidden", view !== "projects");
    if (el.editPanel) el.editPanel.classList.toggle("hidden", view !== "edit");

    // If edit: require password
    if (view === "edit" && !isAdminAuthed()) {
      // bounce back to market + prompt
      state.ui.view = "market";
      persist();
      if (el.marketPanel) el.marketPanel.classList.remove("hidden");
      if (el.projectsPanel) el.projectsPanel.classList.add("hidden");
      if (el.editPanel) el.editPanel.classList.add("hidden");
      for (const b of el.pills()) b.classList.toggle("active", b.dataset.nav === "market");
      openAdminPrompt();
      return;
    }

    // render per view
    renderTopStats();
    renderMarket();
    renderProjects();
    if (view === "edit") renderEditPanel();
  }

  /*****************************************************************
   * 10) ADMIN PASSWORD MODAL (separate from detail modal)
   *****************************************************************/
  let adminModalEl = null;

  function ensureAdminModal(){
    if (adminModalEl) return adminModalEl;

    const wrap = document.createElement("div");
    wrap.id = "adminModal";
    wrap.className = "modal hidden";

    // build a panel inside
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.style.padding = "14px";
    panel.style.maxWidth = "520px";
    panel.style.margin = "0 auto";

    const title = document.createElement("div");
    title.style.fontWeight = "1000";
    title.style.fontSize = "18px";
    title.style.marginBottom = "6px";
    title.textContent = "Admin Lock";

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.style.padding = "0";
    hint.textContent = "Enter the admin password to open the Edit tab.";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "10px";
    row.style.marginTop = "12px";
    row.style.flexWrap = "wrap";

    const input = document.createElement("input");
    input.className = "input";
    input.type = "password";
    input.placeholder = "Password";
    input.autocomplete = "current-password";
    input.style.flex = "1";

    const unlock = document.createElement("button");
    unlock.className = "btn ghost";
    unlock.textContent = "Unlock";

    const cancel = document.createElement("button");
    cancel.className = "btn ghost";
    cancel.textContent = "Cancel";

    const msg = document.createElement("div");
    msg.className = "hint small";
    msg.style.padding = "10px 0 0 0";
    msg.textContent = "";

    function close(){
      hideModal(wrap);
      msg.textContent = "";
      input.value = "";
    }
    function doUnlock(){
      const val = String(input.value || "");
      if (val === ADMIN_PASSWORD) {
        setAdminAuthed(true);
        close();
        setView("edit");
      } else {
        msg.textContent = "Wrong password.";
      }
    }

    unlock.addEventListener("click", doUnlock);
    cancel.addEventListener("click", close);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doUnlock();
      if (e.key === "Escape") close();
    });

    row.appendChild(input);
    row.appendChild(unlock);
    row.appendChild(cancel);

    panel.appendChild(title);
    panel.appendChild(hint);
    panel.appendChild(row);
    panel.appendChild(msg);

    wrap.appendChild(panel);
    document.body.appendChild(wrap);

    adminModalEl = wrap;
    return adminModalEl;
  }

  function showBackdrop(){
    if (!el.modalBackdrop) return;
    el.modalBackdrop.classList.remove("hidden");
  }
  function hideBackdrop(){
    if (!el.modalBackdrop) return;
    el.modalBackdrop.classList.add("hidden");
  }

  function showModal(modalEl){
    showBackdrop();
    modalEl.classList.remove("hidden");
  }
  function hideModal(modalEl){
    modalEl.classList.add("hidden");
    // if both modals hidden => hide backdrop
    const anyOpen = !el.detailModal?.classList.contains("hidden") || !adminModalEl?.classList.contains("hidden");
    if (!anyOpen) hideBackdrop();
  }

  function openAdminPrompt(){
    const m = ensureAdminModal();
    showModal(m);
    // focus password
    const input = m.querySelector("input[type='password']");
    if (input) setTimeout(() => input.focus(), 0);
  }

  /*****************************************************************
   * 11) BUY / SELL / WALLET
   *****************************************************************/
  function ownedQty(id){
    return Math.max(0, Math.floor(nnum(state.wallet.holdings?.[id], 0)));
  }

  function holdingsValue(){
    let total = 0;
    for (const [id, qtyRaw] of Object.entries(state.wallet.holdings || {})) {
      const qty = Math.max(0, Math.floor(nnum(qtyRaw, 0)));
      if (!qty) continue;
      const st = state.stocks[id];
      if (!st) continue;
      total += st.price * qty;
    }
    return total;
  }

  function netWorth(){
    return state.wallet.cash + holdingsValue();
  }

  function buy(id, qty){
    qty = Math.max(1, Math.floor(nnum(qty, 1)));
    const st = state.stocks[id];
    if (!st) return;
    const cost = st.price * qty;
    if (cost > state.wallet.cash + 1e-9) {
      notify("Not enough cash.");
      return;
    }
    state.wallet.cash -= cost;
    state.wallet.holdings[id] = ownedQty(id) + qty;
    persist();
    renderTopStats();
    renderWanted();
    renderPortfolio();
    renderMarket(); // update owned labels
  }

  function sell(id, qty){
    qty = Math.max(1, Math.floor(nnum(qty, 1)));
    const st = state.stocks[id];
    if (!st) return;
    const have = ownedQty(id);
    if (have <= 0) {
      notify("You own 0.");
      return;
    }
    const toSell = Math.min(have, qty);
    state.wallet.holdings[id] = have - toSell;
    if (state.wallet.holdings[id] <= 0) delete state.wallet.holdings[id];
    state.wallet.cash += st.price * toSell;
    persist();
    renderTopStats();
    renderWanted();
    renderPortfolio();
    renderMarket();
  }

  function resetPortfolio(){
    state.wallet.cash = DEFAULT_CASH;
    state.wallet.holdings = {};
    state.sim.day = 0;
    // reset stocks to default (keeps media edits)
    const all = getAllCharacters();
    for (const ch of all) state.stocks[ch.id] = defaultStockFor(ch);
    state.sim.running = false;
    persist();
    stopSim();
    notify("Portfolio reset.");
    renderAll();
  }

  /*****************************************************************
   * 12) SIMULATION
   *****************************************************************/
  function stepOneDay(){
    const all = getAllCharacters();
    const gv = clamp(nnum(state.sim.globalVol, 1), 0, 1000);

    for (const ch of all) {
      const st = state.stocks[ch.id];
      if (!st) continue;

      st.prev = st.price;

      if (st.frozen || st.vol <= 0 || gv <= 0) {
        st.hist.push(st.price);
        st.hist = st.hist.slice(-60);
        continue;
      }

      const vol = clamp(nnum(st.vol, 1), 0, 1000) * gv;

      // gentle walk scaled by price
      const scale = Math.max(1, st.price * 0.012);
      const delta = (Math.random() - 0.5) * 2 * scale * vol;

      let next = st.price + delta;
      next = Math.max(0, next);
      next = Math.min(next, st.cap);

      st.price = next;
      st.hist.push(next);
      st.hist = st.hist.slice(-60);
    }

    state.sim.day += 1;
  }

  let simTimer = null;
  function startSim(){
    state.sim.running = true;
    persist();
    if (simTimer) clearInterval(simTimer);
    simTimer = setInterval(() => {
      stepOneDay();
      persist();
      renderAll();
    }, state.sim.speedMs);
  }

  function stopSim(){
    state.sim.running = false;
    persist();
    if (simTimer) clearInterval(simTimer);
    simTimer = null;
  }

  /*****************************************************************
   * 13) BULK (default mono)
   *****************************************************************/
  let bulkBarEl = null;

  function ensureBulkBar(){
    if (bulkBarEl) return bulkBarEl;

    // attach into Market filters area (same panel)
    const filters = el.marketPanel?.querySelector(".filters");
    if (!filters) return null;

    const bar = document.createElement("div");
    bar.className = "bulkBar";
    bar.style.marginTop = "10px";

    const left = document.createElement("div");
    left.className = "bulkLeft";

    const toggle = document.createElement("button");
    toggle.className = "btn ghost";
    toggle.id = "bulkToggleBtn";

    const clear = document.createElement("button");
    clear.className = "btn ghost";
    clear.textContent = "Clear Picks";

    const count = document.createElement("div");
    count.className = "bulkCount";
    count.id = "bulkCountEl";

    const qtyMini = document.createElement("div");
    qtyMini.className = "qtyMini";
    const qtyLabel = document.createElement("label");
    qtyLabel.textContent = "Qty";
    const qtyInput = document.createElement("input");
    qtyInput.id = "qtyInput";
    qtyInput.className = "input";
    qtyInput.type = "number";
    qtyInput.step = "1";
    qtyInput.min = "1";
    qtyInput.value = String(state.ui.bulkQty || 1);

    qtyMini.appendChild(qtyLabel);
    qtyMini.appendChild(qtyInput);

    left.appendChild(toggle);
    left.appendChild(clear);
    left.appendChild(count);
    left.appendChild(qtyMini);

    const right = document.createElement("div");
    right.className = "bulkRight";

    const buyBtn = document.createElement("button");
    buyBtn.className = "btn buy";
    buyBtn.textContent = "BUY PICKED";

    const sellBtn = document.createElement("button");
    sellBtn.className = "btn sell";
    sellBtn.textContent = "SELL PICKED";

    right.appendChild(buyBtn);
    right.appendChild(sellBtn);

    bar.appendChild(left);
    bar.appendChild(right);

    // events
    function refresh(){
      const on = state.ui.mode === "bulk";
      toggle.textContent = on ? "Bulk: ON" : "Bulk: OFF";
      bar.style.opacity = on ? "1" : ".65";
      bar.style.filter = on ? "none" : "grayscale(.35)";
      count.textContent = `Picked: ${state.ui.bulkSelected.length}`;
      qtyInput.value = String(state.ui.bulkQty || 1);
    }

    toggle.addEventListener("click", () => {
      state.ui.mode = (state.ui.mode === "bulk") ? "mono" : "bulk";
      // "start in mono choice" => default stays mono unless toggled
      persist();
      refresh();
      renderMarket(); // show/hide pickboxes
    });

    clear.addEventListener("click", () => {
      state.ui.bulkSelected = [];
      persist();
      refresh();
      renderMarket();
    });

    qtyInput.addEventListener("change", () => {
      state.ui.bulkQty = clamp(Math.floor(nnum(qtyInput.value, 1)), 1, 1e9);
      persist();
      refresh();
    });

    buyBtn.addEventListener("click", () => {
      if (state.ui.mode !== "bulk") return notify("Turn Bulk ON first.");
      const qty = Math.max(1, Math.floor(nnum(state.ui.bulkQty, 1)));
      const ids = state.ui.bulkSelected.slice();
      if (!ids.length) return notify("Pick some cards first.");
      // buy sequentially until cash ends
      let bought = 0;
      for (const id of ids) {
        const st = state.stocks[id];
        if (!st) continue;
        const cost = st.price * qty;
        if (cost > state.wallet.cash + 1e-9) continue;
        buy(id, qty);
        bought++;
      }
      notify(`Bulk buy complete (${bought}/${ids.length}).`);
    });

    sellBtn.addEventListener("click", () => {
      if (state.ui.mode !== "bulk") return notify("Turn Bulk ON first.");
      const qty = Math.max(1, Math.floor(nnum(state.ui.bulkQty, 1)));
      const ids = state.ui.bulkSelected.slice();
      if (!ids.length) return notify("Pick some cards first.");
      let sold = 0;
      for (const id of ids) {
        if (ownedQty(id) <= 0) continue;
        sell(id, qty);
        sold++;
      }
      notify(`Bulk sell complete (${sold}/${ids.length}).`);
    });

    filters.parentElement.appendChild(bar);
    bulkBarEl = bar;

    refresh();
    return bulkBarEl;
  }

  function toggleBulkPick(id, picked){
    const set = new Set(state.ui.bulkSelected);
    if (picked) set.add(id);
    else set.delete(id);
    state.ui.bulkSelected = Array.from(set);
    persist();
    // update count immediately
    if (bulkBarEl) {
      const c = bulkBarEl.querySelector("#bulkCountEl");
      if (c) c.textContent = `Picked: ${state.ui.bulkSelected.length}`;
    }
  }

  /*****************************************************************
   * 14) RENDER: TOP STATS, WANTED, PORTFOLIO, WATCH
   *****************************************************************/
  function renderTopStats(){
    if (el.dayEl) el.dayEl.textContent = String(state.sim.day);
    if (el.balanceEl) el.balanceEl.textContent = money(state.wallet.cash);
    if (el.netWorthEl) el.netWorthEl.textContent = money(netWorth());
  }

  function computePopularity(ch, st){
    const base = nnum(ch.base, 100) || 100;
    const ratio = base ? (st.price / base) : 1;
    return clamp(Math.round(50 + (ratio - 1) * 60), 0, 100);
  }

  function computePotential(ch, st){
    if (!st.cap) return 0;
    return clamp(Math.round(((st.cap - st.price) / st.cap) * 100), 0, 100);
  }

  function renderWanted(){
    const all = getAllCharacters();
    const ch = all.find(x => x.id === state.ui.selectedId) || all[0];
    if (!ch) return;

    const st = state.stocks[ch.id] || defaultStockFor(ch);
    const media = getMediaFor(ch.id);

    if (el.wantedImg) {
      el.wantedImg.src = media.image || "";
      el.wantedImg.alt = ch.name;
    }
    if (el.wantedName) el.wantedName.textContent = ch.name;
    if (el.wantedRole) el.wantedRole.textContent = `${String(ch.type || "unknown").toUpperCase()} • ${ch.id}`;
    if (el.wantedPrice) el.wantedPrice.textContent = money(st.price);
    if (el.wantedOwned) el.wantedOwned.textContent = String(ownedQty(ch.id));
    if (el.wantedPop) el.wantedPop.textContent = String(computePopularity(ch, st));
    if (el.wantedPot) el.wantedPot.textContent = String(computePotential(ch, st));
    if (el.wantedCap) el.wantedCap.textContent = money(st.cap);
    if (el.wantedFrozen) el.wantedFrozen.textContent = (st.frozen || st.vol <= 0) ? "FROZEN" : "LIVE";

    if (el.wantedLinkBtn) {
      if (media.link) {
        el.wantedLinkBtn.href = media.link;
        el.wantedLinkBtn.style.pointerEvents = "auto";
        el.wantedLinkBtn.style.opacity = "1";
      } else {
        el.wantedLinkBtn.removeAttribute("href");
        el.wantedLinkBtn.style.pointerEvents = "none";
        el.wantedLinkBtn.style.opacity = ".55";
      }
    }

    if (el.wantedBuyBtn) el.wantedBuyBtn.onclick = () => buy(ch.id, 1);
    if (el.wantedSellBtn) el.wantedSellBtn.onclick = () => sell(ch.id, 1);
  }

  function renderPortfolio(){
    if (!el.positionsList) return;

    // add missing class in case CSS expects it
    el.positionsList.classList.add("portfolioList");

    const entries = Object.entries(state.wallet.holdings || {})
      .map(([id, qty]) => ({ id, qty: Math.max(0, Math.floor(nnum(qty, 0))) }))
      .filter(x => x.qty > 0);

    if (el.positionsCount) el.positionsCount.textContent = String(entries.length);
    if (el.holdingsValue) el.holdingsValue.textContent = money(holdingsValue());
    if (el.cashValue) el.cashValue.textContent = money(state.wallet.cash);

    el.positionsList.innerHTML = "";

    const all = getAllCharacters();
    const byId = new Map(all.map(c => [c.id, c]));

    for (const pos of entries) {
      const ch = byId.get(pos.id);
      const st = state.stocks[pos.id];
      if (!ch || !st) continue;

      const row = document.createElement("div");
      row.className = "posRow";

      const left = document.createElement("div");
      const name = document.createElement("div");
      name.className = "posName";
      name.textContent = ch.name;

      const meta = document.createElement("div");
      meta.className = "posMeta";
      meta.textContent = `Owned: ${pos.qty} • Price: ${money(st.price)} • Value: ${money(st.price * pos.qty)}`;

      left.appendChild(name);
      left.appendChild(meta);

      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.gap = "8px";
      right.style.flexWrap = "wrap";
      right.style.alignItems = "center";

      const b1 = document.createElement("button");
      b1.className = "btn buy";
      b1.textContent = "+1";
      b1.addEventListener("click", () => buy(pos.id, 1));

      const s1 = document.createElement("button");
      s1.className = "btn sell";
      s1.textContent = "-1";
      s1.addEventListener("click", () => sell(pos.id, 1));

      const focus = document.createElement("button");
      focus.className = "btn ghost";
      focus.textContent = "Focus";
      focus.addEventListener("click", () => {
        state.ui.selectedId = pos.id;
        persist();
        renderWanted();
        renderMarket();
      });

      right.appendChild(b1);
      right.appendChild(s1);
      right.appendChild(focus);

      row.appendChild(left);
      row.appendChild(right);

      el.positionsList.appendChild(row);
    }
  }

  function renderWatch(){
    if (!el.gainersList || !el.losersList) return;

    const all = getAllCharacters();
    const rows = [];

    for (const ch of all) {
      const st = state.stocks[ch.id];
      if (!st) continue;
      const prev = (st.prev > 0) ? st.prev : st.price;
      const delta = st.price - prev;
      const pct = prev ? (delta / prev) * 100 : 0;
      rows.push({ id: ch.id, name: ch.name, pct });
    }

    rows.sort((a, b) => b.pct - a.pct);
    const gainers = rows.slice(0, 6);
    const losers = rows.slice(-6).sort((a, b) => a.pct - b.pct);

    function makeList(target, items){
      target.innerHTML = "";
      for (const r of items) {
        const row = document.createElement("div");
        row.className = "watchRow";
        row.addEventListener("click", () => {
          state.ui.selectedId = r.id;
          persist();
          renderWanted();
          renderMarket();
        });

        const name = document.createElement("div");
        name.className = "watchName";
        name.textContent = r.name;

        const d = document.createElement("div");
        d.className = "watchDelta " + (r.pct >= 0 ? "good" : "bad");
        d.textContent = `${r.pct >= 0 ? "+" : ""}${r.pct.toFixed(1)}%`;

        row.appendChild(name);
        row.appendChild(d);
        target.appendChild(row);
      }
    }

    makeList(el.gainersList, gainers);
    makeList(el.losersList, losers);
  }

  /*****************************************************************
   * 15) MARKET RENDER (GRID) + FILTERS
   *****************************************************************/
  function buildFilterOptions(all){
    // arcSelect (tags)
    const tagSet = new Set();
    for (const ch of all) for (const t of (ch.tags || [])) tagSet.add(String(t));
    const tags = Array.from(tagSet).sort((a,b) => nnum(a,0)-nnum(b,0));

    if (el.arcSelect && !el.arcSelect.dataset.built) {
      el.arcSelect.innerHTML = "";
      const o0 = document.createElement("option");
      o0.value = "all";
      o0.textContent = "All Arcs";
      el.arcSelect.appendChild(o0);

      for (const t of tags) {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = `Arc ${t}`;
        el.arcSelect.appendChild(opt);
      }
      el.arcSelect.dataset.built = "1";
    }

    // typeSelect
    const typeSet = new Set(all.map(c => String(c.type || "unknown")));
    const types = Array.from(typeSet).sort((a,b) => a.localeCompare(b));

    if (el.typeSelect && !el.typeSelect.dataset.built) {
      el.typeSelect.innerHTML = "";
      const o0 = document.createElement("option");
      o0.value = "all";
      o0.textContent = "All Types";
      el.typeSelect.appendChild(o0);

      for (const t of types) {
        const opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        el.typeSelect.appendChild(opt);
      }
      el.typeSelect.dataset.built = "1";
    }

    // sortSelect
    if (el.sortSelect && !el.sortSelect.dataset.built) {
      el.sortSelect.innerHTML = "";
      const opts = [
        ["default", "Default"],
        ["name_asc", "Name A→Z"],
        ["price_desc", "Price ↓"],
        ["price_asc", "Price ↑"],
        ["pct_desc", "Δ% ↓"],
        ["pct_asc", "Δ% ↑"],
      ];
      for (const [v, label] of opts) {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = label;
        el.sortSelect.appendChild(opt);
      }
      el.sortSelect.dataset.built = "1";
    }
  }

  function applyMarketFilters(all){
    const q = (state.ui.search || "").trim().toLowerCase();
    const arc = state.ui.arc;
    const type = state.ui.type;

    let list = all.slice();

    if (q) {
      list = list.filter(ch =>
        ch.name.toLowerCase().includes(q) ||
        ch.id.toLowerCase().includes(q)
      );
    }
    if (arc !== "all") {
      list = list.filter(ch => (ch.tags || []).map(String).includes(String(arc)));
    }
    if (type !== "all") {
      list = list.filter(ch => String(ch.type || "unknown") === type);
    }

    // sort
    const sort = state.ui.sort;
    const pctOf = (id) => {
      const st = state.stocks[id];
      if (!st) return 0;
      const prev = st.prev > 0 ? st.prev : st.price;
      const delta = st.price - prev;
      return prev ? (delta / prev) * 100 : 0;
    };

    if (sort === "name_asc") list.sort((a,b) => a.name.localeCompare(b.name));
    else if (sort === "price_desc") list.sort((a,b) => (state.stocks[b.id]?.price||0) - (state.stocks[a.id]?.price||0));
    else if (sort === "price_asc") list.sort((a,b) => (state.stocks[a.id]?.price||0) - (state.stocks[b.id]?.price||0));
    else if (sort === "pct_desc") list.sort((a,b) => pctOf(b.id) - pctOf(a.id));
    else if (sort === "pct_asc") list.sort((a,b) => pctOf(a.id) - pctOf(b.id));

    return list;
  }

  function renderMarket(){
    if (!el.marketGrid) return;

    // make sure it becomes a grid using your existing card CSS
    el.marketGrid.classList.add("projectsGrid"); // forces grid layout from Style.CSS
    ensureBulkBar();

    const all = getAllCharacters();
    normalizeStocks(all);

    // sync filter inputs (once)
    buildFilterOptions(all);

    if (el.searchInput) el.searchInput.value = state.ui.search || "";
    if (el.arcSelect) el.arcSelect.value = state.ui.arc || "all";
    if (el.typeSelect) el.typeSelect.value = state.ui.type || "all";
    if (el.sortSelect) el.sortSelect.value = state.ui.sort || "default";

    const list = applyMarketFilters(all);

    if (el.resultCount) el.resultCount.textContent = String(list.length);

    el.marketGrid.innerHTML = "";

    for (const ch of list) {
      const st = state.stocks[ch.id] || defaultStockFor(ch);
      const media = getMediaFor(ch.id);

      const prev = st.prev > 0 ? st.prev : st.price;
      const pct = prev ? ((st.price - prev) / prev) * 100 : 0;

      const card = document.createElement("div");
      card.className = "card";
      card.dataset.id = ch.id;

      const picked = state.ui.bulkSelected.includes(ch.id);
      if (picked) card.classList.add("selected");

      const top = document.createElement("div");
      top.className = "cardTop";

      const img = document.createElement("img");
      img.className = "cardImg";
      img.alt = ch.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.src = media.image || "";
      top.appendChild(img);

      // pickBox only visible in bulk mode (mono choice default)
      if (state.ui.mode === "bulk") {
        const pickBox = document.createElement("label");
        pickBox.className = "pickBox";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = picked;
        const span = document.createElement("span");
        span.textContent = "Pick";
        pickBox.appendChild(cb);
        pickBox.appendChild(span);

        cb.addEventListener("click", (e) => e.stopPropagation());
        pickBox.addEventListener("click", (e) => e.stopPropagation());

        cb.addEventListener("change", () => {
          toggleBulkPick(ch.id, cb.checked);
          card.classList.toggle("selected", cb.checked);
        });

        top.appendChild(pickBox);
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

      const ticker = document.createElement("div");
      ticker.className = "ticker";
      ticker.textContent = String(ch.type || "unknown").toUpperCase();

      left.appendChild(name);
      left.appendChild(ticker);

      const right = document.createElement("div");
      right.style.textAlign = "right";

      const price = document.createElement("div");
      price.className = "cardPrice";
      price.textContent = money(st.price);

      const delta = document.createElement("div");
      delta.className = "delta " + (pct >= 0 ? "good" : "bad");
      delta.textContent = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;

      right.appendChild(price);
      right.appendChild(delta);

      row.appendChild(left);
      row.appendChild(right);

      const owned = document.createElement("div");
      owned.className = "cardOwned";
      owned.textContent = `Owned: ${ownedQty(ch.id)} • Cap: ${money(st.cap)} • ${st.frozen || st.vol <= 0 ? "FROZEN" : "LIVE"}`;

      const btns = document.createElement("div");
      btns.className = "cardBtns";

      const b = document.createElement("button");
      b.className = "btn buy";
      b.textContent = "Buy";
      b.addEventListener("click", (e) => { e.stopPropagation(); buy(ch.id, 1); });

      const s = document.createElement("button");
      s.className = "btn sell";
      s.textContent = "Sell";
      s.addEventListener("click", (e) => { e.stopPropagation(); sell(ch.id, 1); });

      btns.appendChild(b);
      btns.appendChild(s);

      body.appendChild(row);
      body.appendChild(owned);
      body.appendChild(btns);

      card.appendChild(top);
      card.appendChild(divider);
      card.appendChild(body);

      // click selects wanted (mono)
      card.addEventListener("click", () => {
        state.ui.selectedId = ch.id;
        persist();
        renderWanted();
        // visual focus
        // (use selected class ONLY for bulk, so we don't conflict)
        renderMarket();
      });

      // double click opens modal
      card.addEventListener("dblclick", (e) => {
        e.preventDefault();
        openDetailModal(ch.id);
      });

      el.marketGrid.appendChild(card);
    }

    renderWanted();
    renderPortfolio();
    renderWatch();
  }

  /*****************************************************************
   * 16) PROJECTS TAB (simple mirror grid)
   *****************************************************************/
  function renderProjects(){
    if (!el.projectsGrid) return;
    el.projectsGrid.classList.add("projectsGrid");

    const all = getAllCharacters();
    const list = all.slice().sort((a,b) => a.name.localeCompare(b.name));

    el.projectsGrid.innerHTML = "";

    for (const ch of list) {
      const st = state.stocks[ch.id] || defaultStockFor(ch);
      const media = getMediaFor(ch.id);

      const card = document.createElement("div");
      card.className = "card";

      const top = document.createElement("div");
      top.className = "cardTop";

      const img = document.createElement("img");
      img.className = "cardImg";
      img.alt = ch.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.src = media.image || "";
      top.appendChild(img);

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
      const ticker = document.createElement("div");
      ticker.className = "ticker";
      ticker.textContent = ch.id;

      left.appendChild(name);
      left.appendChild(ticker);

      const right = document.createElement("div");
      right.style.textAlign = "right";
      const price = document.createElement("div");
      price.className = "cardPrice";
      price.textContent = money(st.price);
      right.appendChild(price);

      row.appendChild(left);
      row.appendChild(right);

      const owned = document.createElement("div");
      owned.className = "cardOwned";
      owned.textContent = `Type: ${String(ch.type || "unknown")} • Owned: ${ownedQty(ch.id)}`;

      body.appendChild(row);
      body.appendChild(owned);

      card.appendChild(top);
      card.appendChild(divider);
      card.appendChild(body);

      card.addEventListener("click", () => {
        state.ui.selectedId = ch.id;
        state.ui.view = "market";
        persist();
        renderView();
      });

      el.projectsGrid.appendChild(card);
    }
  }

  /*****************************************************************
   * 17) DETAIL MODAL
   *****************************************************************/
  function openDetailModal(id){
    const all = getAllCharacters();
    const ch = all.find(x => x.id === id);
    if (!ch) return;

    const st = state.stocks[id] || defaultStockFor(ch);
    const media = getMediaFor(id);

    if (el.modalImg) el.modalImg.src = media.image || "";
    if (el.modalTitle) el.modalTitle.textContent = ch.name;
    if (el.modalSub) el.modalSub.textContent = `${String(ch.type || "unknown").toUpperCase()} • ${id}`;
    if (el.modalPrice) el.modalPrice.textContent = `Price: ${money(st.price)}`;
    if (el.modalOwned) el.modalOwned.textContent = `Owned: ${ownedQty(id)}`;
    if (el.modalPotential) el.modalPotential.textContent = `Potential: ${computePotential(ch, st)}`;
    if (el.modalPop) el.modalPop.textContent = `Popularity: ${computePopularity(ch, st)}`;
    if (el.modalCap) el.modalCap.textContent = `Cap: ${money(st.cap)}`;
    if (el.modalFrozen) el.modalFrozen.textContent = `Status: ${(st.frozen || st.vol <= 0) ? "FROZEN" : "LIVE"}`;

    if (el.modalLinkBtn) {
      if (media.link) {
        el.modalLinkBtn.href = media.link;
        el.modalLinkBtn.textContent = "Open Dossier";
        el.modalLinkBtn.style.pointerEvents = "auto";
        el.modalLinkBtn.style.opacity = "1";
      } else {
        el.modalLinkBtn.removeAttribute("href");
        el.modalLinkBtn.textContent = "No link";
        el.modalLinkBtn.style.pointerEvents = "none";
        el.modalLinkBtn.style.opacity = ".55";
      }
    }

    if (el.modalBuyBtn) el.modalBuyBtn.onclick = () => buy(id, 1);
    if (el.modalSellBtn) el.modalSellBtn.onclick = () => sell(id, 1);

    renderSpark(st.hist || []);
    renderHistory(st.hist || []);

    showModal(el.detailModal);
  }

  function closeDetailModal(){
    if (!el.detailModal) return;
    hideModal(el.detailModal);
  }

  function renderSpark(hist){
    const c = el.spark;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);

    const data = Array.isArray(hist) ? hist.slice(-60) : [];
    if (data.length < 2) return;

    let min = Infinity, max = -Infinity;
    for (const v of data) { min = Math.min(min, v); max = Math.max(max, v); }
    if (!Number.isFinite(min) || !Number.isFinite(max)) return;
    if (max - min < 1e-9) { max = min + 1; }

    const pad = 10;
    const dx = (w - pad * 2) / (data.length - 1);

    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 2;

    // stroke color: use default (CSS doesn't control canvas); pick neutral
    ctx.strokeStyle = "rgba(234,242,255,.9)";

    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = pad + i * dx;
      const t = (data[i] - min) / (max - min);
      const y = pad + (1 - t) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // baseline
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();
  }

  function renderHistory(hist){
    if (!el.historyList) return;
    el.historyList.innerHTML = "";
    const data = Array.isArray(hist) ? hist.slice(-12) : [];
    for (let i = data.length - 1; i >= 0; i--) {
      const row = document.createElement("div");
      row.className = "hRow";
      const left = document.createElement("div");
      left.textContent = `t-${data.length - 1 - i}`;
      const right = document.createElement("div");
      right.style.fontWeight = "1000";
      right.textContent = money(data[i]);
      row.appendChild(left);
      row.appendChild(right);
      el.historyList.appendChild(row);
    }
  }

  /*****************************************************************
   * 18) EDIT PANEL (password-gated)
   *****************************************************************/
  let adminInjected = false;

  function renderEditPanel(){
    if (!el.editPanel) return;

    // fill select
    const all = getAllCharacters();
    normalizeStocks(all);

    if (el.editCharSelect) {
      el.editCharSelect.innerHTML = "";
      for (const ch of all) {
        const opt = document.createElement("option");
        opt.value = ch.id;
        opt.textContent = `${ch.name} (${ch.id})`;
        el.editCharSelect.appendChild(opt);
      }
      // keep current selection in edit
      if (all.some(c => c.id === state.ui.selectedId)) el.editCharSelect.value = state.ui.selectedId;
      else el.editCharSelect.value = all[0]?.id || "";
    }

    function syncFields(){
      const id = el.editCharSelect ? el.editCharSelect.value : state.ui.selectedId;
      state.ui.selectedId = id;
      persist();

      const m = getMediaFor(id);
      if (el.editImg) el.editImg.value = m.image || "";
      if (el.editLink) el.editLink.value = m.link || "";

      if (el.bulkJson) {
        el.bulkJson.value =
`// Bulk JSON formats supported:
// 1) { "id": { "image": "...", "link": "..." }, ... }
// 2) [ { "id": "...", "image": "...", "link": "..." }, ... ]
//
// Example:
// {
//   "kaien_dazhen": { "image":"https://...", "link":"https://..." }
// }`;
      }

      renderWanted();
      renderMarket();
    }

    if (el.editCharSelect) {
      el.editCharSelect.onchange = syncFields;
    }

    if (el.saveEditBtn) {
      el.saveEditBtn.onclick = () => {
        const id = el.editCharSelect?.value || state.ui.selectedId;
        if (!id) return;

        const img = safeUrl(el.editImg?.value || "");
        const link = safeUrl(el.editLink?.value || "");

        mediaOverrides[id] = { image: img, link };
        saveMediaOverrides();
        notify("Saved.");
        renderWanted();
        renderMarket();
        renderProjects();
      };
    }

    if (el.resetEditBtn) {
      el.resetEditBtn.onclick = () => {
        const id = el.editCharSelect?.value || state.ui.selectedId;
        if (!id) return;
        delete mediaOverrides[id];
        saveMediaOverrides();
        notify("Reset.");
        syncFields();
        renderProjects();
      };
    }

    if (el.applyBulkBtn) {
      el.applyBulkBtn.onclick = () => {
        const raw = String(el.bulkJson?.value || "").trim();
        if (!raw) return;

        // allow comments starting with //
        const cleaned = raw
          .split("\n")
          .filter(line => !line.trim().startsWith("//"))
          .join("\n")
          .trim();

        let parsed;
        try { parsed = JSON.parse(cleaned); }
        catch { return notify("Bulk JSON invalid."); }

        const applyOne = (obj) => {
          if (!obj || typeof obj !== "object") return;
          const id = String(obj.id || "").trim();
          if (!id) return;
          const img = safeUrl(obj.image || "");
          const link = safeUrl(obj.link || "");
          mediaOverrides[id] = { image: img, link };
        };

        if (Array.isArray(parsed)) {
          for (const item of parsed) applyOne(item);
        } else if (parsed && typeof parsed === "object") {
          // mapping
          for (const [id, v] of Object.entries(parsed)) {
            applyOne({ id, ...(v || {}) });
          }
        }

        saveMediaOverrides();
        notify("Bulk applied.");
        syncFields();
        renderProjects();
      };
    }

    // inject admin tools once
    if (!adminInjected) {
      injectAdminTools();
      adminInjected = true;
    }

    syncFields();
  }

  function injectAdminTools(){
    if (!el.editPanel) return;

    // Wrap existing edit controls into grid style (CSS already has .editGrid)
    // We won't reorder your HTML nodes; only append admin panel below.
    const adminWrap = document.createElement("div");
    adminWrap.className = "adminWrap";

    const title = document.createElement("div");
    title.className = "panelTitle";
    title.textContent = "Admin Panel";

    const hint = document.createElement("div");
    hint.className = "hint small";
    hint.textContent = "Control volatility, caps, freeze, wallet, and add/remove custom characters.";

    const grid = document.createElement("div");
    grid.className = "adminGrid";

    // --- Stock Controls
    const stockCard = document.createElement("div");
    stockCard.className = "adminCard";

    const stockTitle = document.createElement("div");
    stockTitle.className = "adminTitle";
    stockTitle.textContent = "Stock Controls";

    const sel = document.createElement("select");
    sel.className = "select full";

    const vol = document.createElement("input");
    vol.className = "input";
    vol.type = "number";
    vol.step = "0.1";
    vol.placeholder = "Volatility (0 = frozen)";

    const cap = document.createElement("input");
    cap.className = "input";
    cap.type = "number";
    cap.step = "1";
    cap.placeholder = "Max Cap";

    const price = document.createElement("input");
    price.className = "input";
    price.type = "number";
    price.step = "1";
    price.placeholder = "Set Price";

    const btns = document.createElement("div");
    btns.className = "adminBtns";

    const applyVolBtn = document.createElement("button");
    applyVolBtn.className = "btn ghost";
    applyVolBtn.textContent = "Apply Volatility";

    const applyCapBtn = document.createElement("button");
    applyCapBtn.className = "btn ghost";
    applyCapBtn.textContent = "Apply Cap";

    const applyPriceBtn = document.createElement("button");
    applyPriceBtn.className = "btn ghost";
    applyPriceBtn.textContent = "Set Price";

    const freezeBtn = document.createElement("button");
    freezeBtn.className = "btn ghost";
    freezeBtn.textContent = "Toggle Freeze";

    const resetStocksBtn = document.createElement("button");
    resetStocksBtn.className = "btn ghost";
    resetStocksBtn.textContent = "Reset ALL Stocks (defaults)";

    btns.appendChild(applyVolBtn);
    btns.appendChild(applyCapBtn);
    btns.appendChild(applyPriceBtn);
    btns.appendChild(freezeBtn);
    btns.appendChild(resetStocksBtn);

    stockCard.appendChild(stockTitle);
    stockCard.appendChild(sel);
    stockCard.appendChild(vol);
    stockCard.appendChild(cap);
    stockCard.appendChild(price);
    stockCard.appendChild(btns);

    // --- Wallet Controls
    const walletCard = document.createElement("div");
    walletCard.className = "adminCard";

    const walletTitle = document.createElement("div");
    walletTitle.className = "adminTitle";
    walletTitle.textContent = "Wallet / Holdings";

    const cashAdd = document.createElement("input");
    cashAdd.className = "input";
    cashAdd.type = "number";
    cashAdd.step = "1";
    cashAdd.placeholder = "Give cash (e.g. 1000000)";

    const cashSet = document.createElement("input");
    cashSet.className = "input";
    cashSet.type = "number";
    cashSet.step = "1";
    cashSet.placeholder = "Set cash (absolute)";

    const sharesSet = document.createElement("input");
    sharesSet.className = "input";
    sharesSet.type = "number";
    sharesSet.step = "1";
    sharesSet.placeholder = "Set owned shares for selected (absolute)";

    const wBtns = document.createElement("div");
    wBtns.className = "adminBtns";

    const giveCashBtn = document.createElement("button");
    giveCashBtn.className = "btn ghost";
    giveCashBtn.textContent = "Give Cash";

    const setCashBtn = document.createElement("button");
    setCashBtn.className = "btn ghost";
    setCashBtn.textContent = "Set Cash";

    const setSharesBtn = document.createElement("button");
    setSharesBtn.className = "btn ghost";
    setSharesBtn.textContent = "Set Owned Shares";

    const lockBtn = document.createElement("button");
    lockBtn.className = "btn ghost";
    lockBtn.textContent = "Lock Admin (log out)";

    wBtns.appendChild(giveCashBtn);
    wBtns.appendChild(setCashBtn);
    wBtns.appendChild(setSharesBtn);
    wBtns.appendChild(lockBtn);

    walletCard.appendChild(walletTitle);
    walletCard.appendChild(cashAdd);
    walletCard.appendChild(cashSet);
    walletCard.appendChild(sharesSet);
    walletCard.appendChild(wBtns);

    // --- Custom Character Controls (add/remove)
    const charCard = document.createElement("div");
    charCard.className = "adminCard";

    const charTitle = document.createElement("div");
    charTitle.className = "adminTitle";
    charTitle.textContent = "Custom Characters (add/remove)";

    const idIn = document.createElement("input");
    idIn.className = "input";
    idIn.placeholder = "id (unique, no spaces)";

    const nameIn = document.createElement("input");
    nameIn.className = "input";
    nameIn.placeholder = "name";

    const typeIn = document.createElement("input");
    typeIn.className = "input";
    typeIn.placeholder = "type (human/npc/maji/etc)";

    const tagsIn = document.createElement("input");
    tagsIn.className = "input";
    tagsIn.placeholder = "tags (comma nums, e.g. 0,2,5)";

    const baseIn = document.createElement("input");
    baseIn.className = "input";
    baseIn.type = "number";
    baseIn.step = "1";
    baseIn.placeholder = "base price";

    const minIn = document.createElement("input");
    minIn.className = "input";
    minIn.type = "number";
    minIn.step = "1";
    minIn.placeholder = "min";

    const maxIn = document.createElement("input");
    maxIn.className = "input";
    maxIn.type = "number";
    maxIn.step = "1";
    maxIn.placeholder = "max";

    const cBtns = document.createElement("div");
    cBtns.className = "adminBtns";

    const addBtn = document.createElement("button");
    addBtn.className = "btn ghost";
    addBtn.textContent = "Add / Update Custom";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn ghost";
    removeBtn.textContent = "Remove Custom by id";

    cBtns.appendChild(addBtn);
    cBtns.appendChild(removeBtn);

    charCard.appendChild(charTitle);
    charCard.appendChild(idIn);
    charCard.appendChild(nameIn);
    charCard.appendChild(typeIn);
    charCard.appendChild(tagsIn);
    charCard.appendChild(baseIn);
    charCard.appendChild(minIn);
    charCard.appendChild(maxIn);
    charCard.appendChild(cBtns);

    // layout: 3 cards
    grid.appendChild(stockCard);
    grid.appendChild(walletCard);
    grid.appendChild(charCard);

    adminWrap.appendChild(title);
    adminWrap.appendChild(hint);
    adminWrap.appendChild(grid);

    // append to edit panel
    el.editPanel.appendChild(adminWrap);

    function rebuildStockSelect(){
      const all = getAllCharacters();
      normalizeStocks(all);

      sel.innerHTML = "";
      for (const ch of all) {
        const opt = document.createElement("option");
        opt.value = ch.id;
        opt.textContent = `${ch.name} (${ch.id})`;
        sel.appendChild(opt);
      }
      sel.value = state.ui.selectedId || all[0]?.id || "";
      refreshStockInputs();
    }

    function refreshStockInputs(){
      const id = sel.value;
      const st = state.stocks[id];
      if (!st) return;
      vol.value = String(st.vol);
      cap.value = String(Math.round(st.cap));
      price.value = String(Math.round(st.price));
      freezeBtn.textContent = (st.frozen || st.vol <= 0) ? "Unfreeze" : "Freeze";
    }

    sel.addEventListener("change", () => {
      state.ui.selectedId = sel.value;
      persist();
      refreshStockInputs();
      renderWanted();
      renderMarket();
    });

    applyVolBtn.addEventListener("click", () => {
      const id = sel.value;
      const st = state.stocks[id];
      if (!st) return;
      st.vol = clamp(nnum(vol.value, st.vol), 0, 1000);
      if (st.vol <= 0) st.frozen = true;
      persist();
      refreshStockInputs();
      renderAll();
      notify("Volatility updated.");
    });

    applyCapBtn.addEventListener("click", () => {
      const id = sel.value;
      const st = state.stocks[id];
      if (!st) return;
      const v = Math.max(0, nnum(cap.value, st.cap));
      st.cap = Math.max(v, st.price);
      persist();
      refreshStockInputs();
      renderAll();
      notify("Cap updated.");
    });

    applyPriceBtn.addEventListener("click", () => {
      const id = sel.value;
      const st = state.stocks[id];
      if (!st) return;
      const v = Math.max(0, nnum(price.value, st.price));
      st.price = Math.min(v, st.cap);
      st.cap = Math.max(st.cap, st.price);
      persist();
      refreshStockInputs();
      renderAll();
      notify("Price updated.");
    });

    freezeBtn.addEventListener("click", () => {
      const id = sel.value;
      const st = state.stocks[id];
      if (!st) return;
      st.frozen = !st.frozen;
      persist();
      refreshStockInputs();
      renderAll();
      notify(st.frozen ? "Frozen." : "Unfrozen.");
    });

    resetStocksBtn.addEventListener("click", () => {
      const all = getAllCharacters();
      for (const ch of all) state.stocks[ch.id] = defaultStockFor(ch);
      persist();
      refreshStockInputs();
      renderAll();
      notify("All stocks reset.");
    });

    giveCashBtn.addEventListener("click", () => {
      const amt = nnum(cashAdd.value, 0);
      state.wallet.cash = Math.max(0, state.wallet.cash + amt);
      cashAdd.value = "";
      persist();
      renderTopStats();
      renderPortfolio();
      notify("Cash given.");
    });

    setCashBtn.addEventListener("click", () => {
      const v = Math.max(0, nnum(cashSet.value, state.wallet.cash));
      state.wallet.cash = v;
      cashSet.value = "";
      persist();
      renderTopStats();
      renderPortfolio();
      notify("Cash set.");
    });

    setSharesBtn.addEventListener("click", () => {
      const id = sel.value;
      const v = Math.max(0, Math.floor(nnum(sharesSet.value, 0)));
      if (!v) delete state.wallet.holdings[id];
      else state.wallet.holdings[id] = v;
      sharesSet.value = "";
      persist();
      renderAll();
      notify("Shares set.");
    });

    lockBtn.addEventListener("click", () => {
      setAdminAuthed(false);
      stopSim();
      notify("Admin locked.");
      setView("market");
    });

    addBtn.addEventListener("click", () => {
      const id = String(idIn.value || "").trim();
      if (!id || /\s/.test(id)) return notify("Invalid id (no spaces).");

      const tagNums = String(tagsIn.value || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => nnum(s, 0));

      const obj = {
        id,
        name: String(nameIn.value || id),
        type: String(typeIn.value || "custom"),
        tags: tagNums,
        stock: 0,
        base: Math.max(0, nnum(baseIn.value, 100)),
        min: Math.max(0, nnum(minIn.value, 0)),
        max: Math.max(0, nnum(maxIn.value, 0)),
      };

      if (!Array.isArray(state.customChars)) state.customChars = [];
      const idx = state.customChars.findIndex(x => x && x.id === id);
      if (idx >= 0) state.customChars[idx] = obj;
      else state.customChars.push(obj);

      // ensure stocks exist
      const all = getAllCharacters();
      normalizeStocks(all);

      persist();
      rebuildStockSelect();
      renderAll();
      notify("Custom character saved.");
    });

    removeBtn.addEventListener("click", () => {
      const id = String(idIn.value || "").trim();
      if (!id) return;
      const before = Array.isArray(state.customChars) ? state.customChars.length : 0;
      state.customChars = (state.customChars || []).filter(x => x && x.id !== id);
      if (state.customChars.length === before) return notify("Not found in custom list.");
      delete state.stocks[id];
      delete state.wallet.holdings[id];
      delete mediaOverrides[id];
      saveMediaOverrides();
      persist();
      rebuildStockSelect();
      renderAll();
      notify("Custom character removed.");
    });

    rebuildStockSelect();
  }

  /*****************************************************************
   * 19) INPUT EVENTS (filters + sim buttons + nav)
   *****************************************************************/
  function wireEvents(){
    // nav
    for (const b of el.pills()) {
      b.addEventListener("click", () => {
        const target = b.dataset.nav;
        if (target === "edit") {
          if (!isAdminAuthed()) return openAdminPrompt();
          setView("edit");
        } else {
          setView(target);
        }
      });
    }

    // market filters
    if (el.searchInput) {
      el.searchInput.addEventListener("input", () => {
        state.ui.search = el.searchInput.value || "";
        persist();
        renderMarket();
      });
    }
    if (el.arcSelect) {
      el.arcSelect.addEventListener("change", () => {
        state.ui.arc = el.arcSelect.value || "all";
        persist();
        renderMarket();
      });
    }
    if (el.typeSelect) {
      el.typeSelect.addEventListener("change", () => {
        state.ui.type = el.typeSelect.value || "all";
        persist();
        renderMarket();
      });
    }
    if (el.sortSelect) {
      el.sortSelect.addEventListener("change", () => {
        state.ui.sort = el.sortSelect.value || "default";
        persist();
        renderMarket();
      });
    }

    // sim buttons
    if (el.speedSelect) {
      el.speedSelect.value = String(state.sim.speedMs);
      el.speedSelect.addEventListener("change", () => {
        state.sim.speedMs = clamp(nnum(el.speedSelect.value, 1000), 80, 60000);
        persist();
        if (state.sim.running) startSim(); // restart with new speed
      });
    }

    if (el.globalVol) {
      el.globalVol.value = String(state.sim.globalVol);
      el.globalVol.addEventListener("change", () => {
        state.sim.globalVol = clamp(nnum(el.globalVol.value, 1), 0, 1000);
        persist();
      });
    }

    if (el.playBtn) el.playBtn.addEventListener("click", () => startSim());
    if (el.pauseBtn) el.pauseBtn.addEventListener("click", () => stopSim());

    if (el.step1Btn) el.step1Btn.addEventListener("click", () => {
      stopSim();
      stepOneDay();
      persist();
      renderAll();
    });

    if (el.step10Btn) el.step10Btn.addEventListener("click", () => {
      stopSim();
      for (let i = 0; i < 10; i++) stepOneDay();
      persist();
      renderAll();
    });

    // reset portfolio
    if (el.resetAllBtn) el.resetAllBtn.addEventListener("click", resetPortfolio);

    // modal close
    if (el.closeModalBtn) el.closeModalBtn.addEventListener("click", closeDetailModal);
    if (el.modalBackdrop) {
      el.modalBackdrop.addEventListener("click", () => {
        if (!el.detailModal?.classList.contains("hidden")) closeDetailModal();
        if (adminModalEl && !adminModalEl.classList.contains("hidden")) hideModal(adminModalEl);
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!el.detailModal?.classList.contains("hidden")) closeDetailModal();
        if (adminModalEl && !adminModalEl.classList.contains("hidden")) hideModal(adminModalEl);
      }
    });
  }

  /*****************************************************************
   * 20) RENDER ALL
   *****************************************************************/
  function renderAll(){
    renderTopStats();
    renderWanted();
    renderPortfolio();
    renderWatch();
    renderMarket();
    if (state.ui.view === "projects") renderProjects();
    if (state.ui.view === "edit" && isAdminAuthed()) renderEditPanel();
  }

  /*****************************************************************
   * 21) BOOT
   *****************************************************************/
  function boot(){
    // sanity: if market grid had no grid CSS, we force it to use projectsGrid layout.
    // (This is the "characters in a GRID" fix.)
    if (el.marketGrid) el.marketGrid.classList.add("projectsGrid");

    const all = getAllCharacters();
    normalizeStocks(all);
    persist();

    wireEvents();

    // default view
    renderView();

    // if sim was running, resume
    if (state.sim.running) startSim();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
