const json = {
 "title": {
  "default": "Questionnaire of Cognitive and Affective Empathy (QCAE)",
  "rs": "Upitnik kognitivne i afektivne empatije",
  "fr": "QCAE",
  "pt": "Portuguese Version of the QCAE (Questionário de Empatia Afetiva e Cognitiva)"
 },
 "description": {
  "default": "Renate L. E. P. Reniers, Rhiannon Corcoran, Richard Drake, Nick M. Shryane & Birgit A. Völlm (2011). The QCAE: A Questionnaire of Cognitive and Affective Empathy. Journal of Personality Assessment. https://doi.org/10.1080/00223891.2010.528484",
  "rs": "Jovan Ivanović, Aleksandra Lazić, Lili Lazarevic, Iris Zezelj, and Danka Purić (2020).  Questionnaire of Cognitive and Affective Empathy - QCAE. https://doi.org/10.17605/OSF.IO/MEZ5N",
  "de": "Henryk Bukowski, Claus Lamm, and Giorgia Silani (2019). When differences matter: rTMS/fMRI reveals how differences in dispositional empathy translate to distinct neural underpinnings of self-other distinction in empathy. https://doi.org/10.17605/OSF.IO/HFNK5",
  "fr": "Brunet-Gouet Eric, Myszkowski Nils, Ehrminger Mickael, Urbach Mathieu, Aouizerate Bruno, Brunel Lore, Capdevielle Delphine, Chereau Isabelle, Dubertret Caroline, Dubreucq Julien, Fond Guillaume, Lan￧on Christophe, Leignier Sylvain, Mallet Jasmina, Misdrahi David, Pires Sylvie, Schneider Priscille, Schurhoff Franck, Yazbek Hanan, Zinetti-Bertschy Anna, Bazin Nadine, Passerieux Christine, Zenasni Franck, Roux Paul (2019). Frontiers in Psychiatry. https://doi.org/10.3389/fpsyt.2019.00751",
  "pt": "Queir￳s, Fernandes, Reniers, Sampaio, Coutinho and Seara-Cardoso (2018). Psychometric properties of the questionnaire of cognitive and affective empathy in a Portuguese sample. https://doi.org/10.1371/journal.pone.0197755"
 },
 "logoPosition": "right",
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "radiogroup",
     "name": "question1",
     "title": {
      "fr": "Parfois, je trouve difficile de voir les choses du point de vue d’une autre personne.",
      "default": "I sometimes find it difficult to see things from the “other guy’s” point of view.",
      "rs": "Ponekad mi je teško da sagledam stvari iz tuđe perspektive",
      "de": "Manchmal finde ich es schwer, Dinge aus der Sicht einer anderen Person zu sehen.",
      "pt": "Às vezes tenho dificuldade em ver as coisas do ponto de vista de outra pessoa"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "1",
       "text": {
        "default": "Strongly agree",
        "fr": "Parfaitement d’accord",
        "rs": "Potpuno tačno",
        "pt": "Concordo Fortemente"
       }
      },
      {
       "value": "2",
       "text": {
        "default": "Slightly agree",
        "fr": "Assez d’accord",
        "pt": "Concordo Ligeiramente"
       }
      },
      {
       "value": "3",
       "text": {
        "default": "Slightly disagree",
        "fr": "Pas vraiment d’accord",
        "pt": "Discordo Ligeiramente"
       }
      },
      {
       "value": "4",
       "text": {
        "default": "Strongly disagree",
        "rs": "Potpuno netačno",
        "fr": "Pas d’accord du tout",
        "pt": "Discordo Fortemente"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question2",
     "title": {
      "fr": "D’habitude je garde mon objectivité quand je regarde un film ou quand je joue, et je ne me laisse pas souvent entrainer complètement dedans.",
      "default": "I am usually objective when I watch a film or play, and I don’t often get completely caught up in it.",
      "rs": "Obično sam objektivan kada gledam film ili predstavu i ne dešava mi se često da se udubim u njih",
      "de": "Wenn ich mir einen Film oder ein Theaterst￼ck ansehe, bleibe ich normalerweise objektiv und gehe selten darin auf.",
      "pt": "Quando vejo um filme ou uma pe￧a de teatro, normalmente sou objetivo(a) e n￣o costumo envolver-me totalmente"
     },
     "isRequired": true,
     "choicesFromQuestion": "question1",
     "choices": [
      {
       "value": "1",
       "text": "Strongly agree"
      },
      {
       "value": "2",
       "text": "Slightly agree"
      },
      {
       "value": "3",
       "text": "Slightly disagree"
      },
      {
       "value": "4",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question3",
     "title": {
      "fr": "J’essaie de voir s’il y a des désaccords chez les autres avant de prendre une décision.",
      "default": "I try to look at everybody’s side of a disagreement before I make a decision.",
      "rs": "Trudim se da sagledam svačiju stranu u raspravi, pre nego što donesem odluku",
      "de": "Ich versuche bei einer Meinungsverschiedenheit zuerst alle Seiten zu verstehen, bevor ich eine Entscheidung treffe.",
      "pt": "Numa situação de desacordo, tento ver o lado de toda a gente antes de tomar uma decisão"
     },
     "isRequired": true,
     "choices": [
      {
       "value": "4",
       "text": {
        "default": "Strongly agree",
        "fr": "Parfaitement d’accord",
        "rs": "Potpuno tačno",
        "pt": "Concordo Fortemente"
       }
      },
      {
       "value": "3",
       "text": {
        "default": "Slightly agree",
        "fr": "Assez d’accord",
        "pt": "Concordo Ligeiramente"
       }
      },
      {
       "value": "2",
       "text": {
        "default": "Slightly disagree",
        "fr": "Pas vraiment d’accord",
        "pt": "Discordo Ligeiramente"
       }
      },
      {
       "value": "1",
       "text": {
        "default": "Strongly disagree",
        "fr": "Pas d’accord du tout",
        "rs": "Potpuno netačno",
        "pt": "Discordo Fortemente"
       }
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question4",
     "title": {
      "fr": "Des fois, j’essaie de mieux comprendre mes amis en imaginant les choses de leur point de vue.",
      "default": "I sometimes try to understand my friends better by imagining how things look from their perspective.",
      "rs": "Ponekad pokušavam da bolje razumem svoje prijatelje tako što zamišljam kako stvari izgledaju iz njihove perspektive",
      "de": "Ich versuche manchmal, meine Freunde besser zu verstehen, indem ich mir vorstelle, wie die Dinge aus ihrer Sicht aussehen.",
      "pt": "Às vezes tento compreender melhor os meus amigos imaginando como são as coisas a partir da perspetiva deles"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question5",
     "title": {
      "fr": "Quand je suis peiné par quelqu’un, j’essaie d’habitude de me mettre à sa place pour un moment.",
      "default": "When I am upset at someone, I usually try to “put myself in his shoes” for a while.",
      "rs": "Kada me neko iznervira, obično pokušam da se stavim u „njegove cipele“ na neko vreme",
      "de": "Wenn ich mich über jemanden aufrege, versuche ich mich normalerweise eine Weile in seine Lage zu versetzen.",
      "pt": "Normalmente, quando estou chateado(a) com alguém, tento por momentos pôr-me na pele dessa pessoa"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question6",
     "title": {
      "fr": "Avant de critiquer quelqu’un, j’essaie d’imaginer ce que je ressentirais si j’étais à sa place.",
      "default": "Before criticizing somebody, I try to imagine how I would feel if I was in their place.",
      "rs": "Pre nego što kritikujem nekog, pokušavam ta zamislim kako bih se ja osećao na njegovom mestu",
      "de": "Bevor ich jemanden kritisiere, versuche ich mir vorzustellen, wie ich mich an seiner Stelle fühlen würde.",
      "pt": "Antes de criticar alguém, tento imaginar como me sentiria se estivesse no seu lugar"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question7",
     "title": {
      "default": "I often get emotionally involved with my friends’ problems.",
      "fr": "Je suis souvent impliqué(e) émotionnellement avec les problèmes de mes amis.",
      "rs": "Često se emotivno unesem u probleme svojih prijatelja",
      "de": "Oft bin ich in Probleme meiner Freunde emotional involviert.",
      "pt": "É frequente ficar emocionalmente envolvido(a) com os problemas dos meus amigos"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question8",
     "title": {
      "fr": "J’ai tendance à devenir nerveux(se) quand les autres autour de moi semblent être nerveux.",
      "default": "I am inclined to get nervous when others around me seem to be nervous.",
      "rs": "Sklon/a sam da postanem nervozan/na kada drugi oko mene deluju nervozno",
      "de": "Ich tendiere dazu nervös zu werden, wenn andere in meiner Umgebung nervös wirken.",
      "pt": "Tenho tendência a ficar nervoso(a) quando os outras à minha volta parecem estar nervosos"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question9",
     "title": {
      "fr": "Les gens avec qui je suis ont une forte influence sur mon humeur.",
      "rs": "Ljudi sa kojima sam imaju jak uticaj na moje raspoloženje",
      "de": "Die Menschen, mit denen ich zusammen bin, haben einen starken Einfluss auf meine Stimmung.",
      "pt": "As pessoas com quem estou têm uma grande influência no meu humor",
      "default": "People I am with have a strong influence onmy mood."
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question10",
     "title": {
      "fr": "Cela m’affecte beaucoup quand un de mes amis paraît avoir de la peine.",
      "default": "It affects me very much when one of my friends seems upset.",
      "rs": "Na mene snažno utiče kada neko od mojih prijatelja deluje uznemireno",
      "de": "Es beeinflusst mich sehr, wenn einer meiner Freunde beunruhigt wirkt. ",
      "pt": "Afeta-me muito quando um dos meus amigos parece estar chateado"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question11",
     "title": {
      "fr": "Je me sens souvent très impliqué(e) dans les sentiments d’un personnage de film, de théâtre ou de roman.",
      "default": "I often get deeply involved with the feelings of a character in a film, play, or novel.",
      "rs": "Često budem duboko uvučen u osećanja nekog lika iz filma, predstave ili romana",
      "de": "Die Gefühle eines Charakters in einem Film, Theaterstück oder Roman beeinflussen mich oft emotional.",
      "pt": "Frequentemente fico profundamente envolvido com os sentimentos duma personagem dum filme, peça de teatro ou livro"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question12",
     "title": {
      "fr": "Je suis très contrarié(e) quand je vois quelqu’un pleurer.",
      "default": "I get very upset when I see someone cry.",
      "rs": "Vrlo se uznemirim kada vidim da neko plače",
      "de": "Es beunruhigt mich sehr, wenn ich jemanden weinen sehe. ",
      "pt": "Fico muito perturbado(a) quando vejo alguém a chorar"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question13",
     "title": {
      "fr": "Je suis heureux(se) quand je suis avec un groupe enjoué et triste quand les autres sont moroses.",
      "default": "I am happy when I am with a cheerful group and sad when the others are glum.",
      "rs": "Srećan sam kada sam u veselom društvu i tužan kada su drugi neraspoloženi",
      "de": "Ich bin glücklich, wenn ich mit fröhlichen Leuten zusammen bin, und traurig, wenn die anderen bedrückt sind.",
      "pt": "Fico alegre quando estou com um grupo de pessoas bem-dispostas e fico triste quando os outros estão em baixo"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question14",
     "title": {
      "fr": "Cela me soucie quand d’autres sont soucieux ou paniqués.",
      "default": "It worries me when others are worrying and panicky.",
      "rs": "Brine me kada drugi brinu i paniče",
      "de": "Ich bin besorgt, wenn andere besorgt und verängstigt sind.",
      "pt": "Preocupa-me quando os outros estão preocupados e nervosos"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question15",
     "title": {
      "fr": "Je peux facilement dire si quelqu’un veut engager la conversation.",
      "default": "I can easily tell if someone else wants to enter a conversation.",
      "rs": "Lako primetim kada neko želi da se priključi razgovoru",
      "de": "Ich erkenne leicht, ob jemand an einem Gespr￤ch interessiert ist.",
      "pt": "Consigo perceber facilmente quando alguém quer entrar numa conversa"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question16",
     "title": {
      "fr": "Je me rends compte rapidement si quelqu’un dit une chose mais veut en dire une autre.",
      "default": "I can pick up quickly if someone says one thing but means another.",
      "rs": "Brzo shvatim kada neko govori jedno, a misli drugo",
      "de": "Ich kann schnell erkennen, wenn jemand etwas anderes sagt, als er meint.",
      "pt": "Consigo perceber rapidamente quando alguém diz uma coisa mas quer dizer outra"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question17",
     "title": {
      "fr": "Il est difficile pour moi de voir pourquoi certaines choses soucient autant les gens.",
      "rs": "Teško mi je da uvidim zašto neke stvari toliko pogađaju druge ljude",
      "de": "Es fällt mir schwer zu verstehen, warum manche Dinge Leute so sehr aufregen.",
      "pt": "É difícil para mim compreender porque é que algumas coisas perturbam tanto as pessoas",
      "default": " It is hard for me to see why some thingsupset people so much."
     },
     "isRequired": true,
     "choicesFromQuestion": "question1",
     "choices": [
      {
       "value": "1",
       "text": "Strongly agree"
      },
      {
       "value": "2",
       "text": "Slightly agree"
      },
      {
       "value": "3",
       "text": "Slightly disagree"
      },
      {
       "value": "4",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question18",
     "title": {
      "fr": "Je trouve qu’il m’est facile de me mettre à la place d’une autre personne.",
      "default": "I find it easy to put myself in somebody else’s shoes.",
      "rs": "Lako mi je da se stavljam u „tuđe cipele“",
      "de": "Ich finde es leicht, mich in jemand anderen hineinzuversetzen.",
      "pt": "É fácil para mim pôr-me na pele de outra pessoa"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question19",
     "title": {
      "fr": "Je sais bien prédire comment va se sentir une autre personne.",
      "default": "I am good at predicting how someone will feel.",
      "rs": "Dobro predviđam kako će se neko osećati",
      "de": "Ich kann gut vorhersagen, wie sich jemand fühlen wird.",
      "pt": "Sou bom (boa) a prever como é que alguém se irá sentir"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question20",
     "title": {
      "fr": "Je m’en rends compte rapidement quand quelqu’un dans un groupe se sent mal à l’aise ou gêné.",
      "default": "I am quick to spot when someone in a group is feeling awkward or uncomfortable.",
      "rs": "Brzo uviđam kada se neko u grupi oseća neprijatno ili nelagodno",
      "de": "Ich bemerke schnell, wenn sich jemand in einer Gruppe unwohl oder unbehaglich fühlt.",
      "pt": "Sou rápido(a) a identificar quando, num grupo, alguém se está a sentir constrangido ou desconfortável"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question21",
     "title": {
      "fr": "Les autres me disent que je sais bien comprendre ce qu’ils ressentent ou ce qu’ils pensent.",
      "default": "Other people tell me I am good at understanding how they are feeling and what they are thinking.",
      "rs": "Drugi ljudi mi govor da mogu dobro da razumem kako se osećaju i šta misle",
      "de": "Andere sagen mir, ich sei gut darin zu verstehen, wie sie fühlen und was sie denken.",
      "pt": "As outras pessoas dizem-me que sou bom (boa) a compreender como elas se estão a sentir e o que estão a pensar"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question22",
     "title": {
      "fr": "Je peux facilement dire si quelqu’un d’autre est intéressé ou ennuyé par ce que je raconte.",
      "default": "I can easily tell if someone else is interested or bored with what I am saying.",
      "rs": "Mogu lako da kažem da li je ono što pričam mom sagovorniku interesantno ili dosadno",
      "de": "Ich erkenne leicht, ob jemand sich für das, was ich sage, interessiert, oder davon gelangweilt ist. ",
      "pt": "Percebo facilmente se alguém está interessado ou entediado com o que estou a dizer"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question23",
     "title": {
      "fr": "Les amis me parlent de leurs problèmes car ils disent que je suis très compréhensif(ve).",
      "default": "Friends talk to me about their problems as they say that I am very understanding.",
      "rs": "Prijatelji često pričaju sa mnom o svojim problemima pošto kažu da sam pun/a razumevanja",
      "de": "Freunde reden mit mir über ihre Probleme, weil sie sagen, ich sei sehr verständnisvoll.",
      "pt": "Os meus amigos conversam comigo sobre os seus problemas porque dizem que sou muito compreensivo(a)"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question24",
     "title": {
      "fr": "Je me rends compte quand je dérange même si l’autre personne ne me le dis pas.",
      "default": "I can sense if I am intruding, even if the other person does not tell me.",
      "rs": "Mogu da osetim da se namećem čak i kada mi druga osoba to ne kaže",
      "de": "Ich erkenne, wenn ich störe, auch wenn die andere Person es mir nicht sagt.",
      "pt": "Consigo sentir se estou a ser intrusivo(a), mesmo que a outra pessoa não mo diga"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question25",
     "title": {
      "fr": "J’arrive facilement à savoir de quoi une autre personne voudrait parler.",
      "default": "I can easily work out what another person might want to talk about.",
      "rs": "Mogu lako ta shvatim o čemu bi neka druga osoba želela da priča",
      "de": "Ich kann leicht herausfinden, worüber eine andere Person vielleicht gerne sprechen würde.",
      "pt": "Consigo perceber facilmente aquilo de que a outra pessoa quer falar"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question26",
     "title": {
      "fr": "Je peux dire si quelqu’un masque ses vraies émotions.",
      "default": "I can tell if someone is masking their true emotion.",
      "rs": "Mogu da kažem kada neko maskira svoje prave emocije",
      "de": "Ich bemerke, ob jemand seine wahren Emotionen verbirgt.",
      "pt": "Consigo perceber quando alguém está a esconder as suas verdadeiras emoções"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question27",
     "title": {
      "fr": "Je sais bien prédire ce qu’une autre personne va faire.",
      "default": "I am good at predicting what someone will do.",
      "rs": "Dobro mogu da predvidim šta će neko drugi uraditi",
      "de": "Ich kann gut vorhersagen, was jemand tun wird.",
      "pt": "Sou bom a prever o que é que alguém irá fazer"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question28",
     "title": {
      "fr": "Je sais généralement bien évaluer le point de vue d’une autre personne, même si je ne suis pas d’accord avec.",
      "default": "I can usually appreciate the other person’s viewpoint, even if I do not agree with it.",
      "rs": "Često razumem viđenje drugih ljudi, čak i ako se ne slažem s njim",
      "de": "Gewöhnlich kann ich die Sichtweise einer anderen Person anerkennen, auch wenn ich anderer Meinung bin.",
      "pt": "Normalmente, consigo compreender o ponto de vista de outra pessoa mesmo que não concorde com ela"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question29",
     "title": {
      "fr": "Je suis habituellement détaché(e) émotionnellement quand je regarde un film.",
      "default": "I usually stay emotionally detached when watching a film.",
      "rs": "Obično ostajem emocionalno distanciran/a kada gledam film",
      "de": "Wenn ich einen Film ansehe, bleibe ich üblicherweise dabei emotional unbeteiligt.",
      "pt": "Normalmente, mantenho-me emocionalmente desligado(a) quando estou a ver um filme"
     },
     "isRequired": true,
     "choicesFromQuestion": "question1",
     "choices": [
      {
       "value": "1",
       "text": "Strongly agree"
      },
      {
       "value": "2",
       "text": "Slightly agree"
      },
      {
       "value": "3",
       "text": "Slightly disagree"
      },
      {
       "value": "4",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question30",
     "title": {
      "fr": "Je prends toujours en considération les sentiments des autres avant de faire quelque chose.",
      "default": "I always try to consider the other fellow’s feelings before I do something.",
      "rs": "Uvek pokušavam da razmorim osećanja druge osobe pre nego što uradim nešto",
      "de": "Ich versuche immer, die Gefühle meiner Mitmenschen zu berücksichtigen, bevor ich etwas tue.",
      "pt": "Tento sempre considerar os sentimentos da outra pessoa antes de fazer alguma coisa"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    },
    {
     "type": "radiogroup",
     "name": "question31",
     "title": {
      "fr": "Avant de faire quelque chose j’essaie de voir comment mes amis vont réagir.",
      "default": "Before I do something I try to consider how my friends will react to it.",
      "rs": "Pre nego što uradim nešto, pokušam da razmotrim kako će moji prijatelji odreagovati na to",
      "de": "Bevor ich etwas tue, versuche ich zu berücksichtigen, wie meine Freunde darauf reagieren werden.",
      "pt": "Antes de fazer alguma coisa, tento ter em consideração como é que os meus amigos vão reagir"
     },
     "isRequired": true,
     "choicesFromQuestion": "question3",
     "choices": [
      {
       "value": "4",
       "text": "Strongly agree"
      },
      {
       "value": "3",
       "text": "Slightly agree"
      },
      {
       "value": "2",
       "text": "Slightly disagree"
      },
      {
       "value": "1",
       "text": "Strongly disagree"
      }
     ]
    }
   ]
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "expression",
     "name": "subscale1",
     "title": "Perspective taking",
     "expression": "{question15} + {question16} + {question19} + {question20} + {question21} + {question22} + {question24} + {question25} + {question26} + {question27}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "subscale2",
     "title": "Online simulation",
     "expression": "{question1} + {question3} + {question4} + {question5} + {question6} + {question18} + {question28} + {question30} + {question31}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "subscale3",
     "title": "Emotion contagion",
     "expression": "{question8} + {question9} + {question13} + {question14}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "subscale4",
     "title": "Proximal responsivity",
     "expression": "{question7} + {question10} + {question12} + {question23}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "subscale5",
     "title": "Peripheral responsivity",
     "expression": " {question2} + {question11} + {question17} + {question29}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "scale1",
     "title": "Cognitive empathy",
     "expression": "{subscale1} + {subscale2}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "scale2",
     "title": "Affective empathy",
     "expression": "{subscale3} + {subscale4} + {subscale5}",
     "format": "{0}"
    },
    {
     "type": "expression",
     "name": "totalscore",
     "title": "Total QCAE score",
     "expression": "{scale1} + {scale2}",
     "format": "{0}"
    }
   ]
  }
 ],
 "showPageTitles": false,
 "showProgressBar": "top",
 "progressBarType": "questions",
 "maxTextLength": 70,
 "maxOthersLength": 70,
 "showPreviewBeforeComplete": "showAllQuestions"
}
