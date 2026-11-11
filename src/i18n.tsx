import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "yo", label: "Yoruba", native: "Yorùbá" },
  { code: "ig", label: "Igbo", native: "Igbo" },
  { code: "ha", label: "Hausa", native: "Hausa" },
  { code: "pcm", label: "Nigerian Pidgin", native: "Naijá Pidgin" },
] as const;

export type Language = (typeof LANGUAGES)[number]["code"];

type Dictionary = Record<string, string>;

const translations: Partial<Record<Language, Dictionary>> = {
  yo: {
    Services: "Iṣẹ́ wa", Products: "Àwọn ọjà", Approach: "Ọ̀nà iṣẹ́ wa", Contact: "Kàn sí wa", "Get a Quote": "Gba ìṣírò iye", "Aluminium, considered": "Aláìmínìọ̀mù pẹ̀lú ìrònú", "A clearer view": "Ìwòye tó ṣe kedere", "of what's possible.": "nípa ohun tó ṣeé ṣe.", "Made-to-measure aluminium windows, doors and architectural systems, shaped around the way you live and build.": "Fèrèsé, ilẹ̀kùn àti ètò ìkọ́lé aláìmínìọ̀mù tí a ṣe sí ìwọ̀n, tó bá ọ̀nà ìgbé ayé àti ìkọ́lé rẹ mu.", "Talk about your project": "Jíròrò iṣẹ́ rẹ", "Explore the range": "Wo oríṣìíríṣìí wa", "Thoughtful details. Clean lines.": "Àwọn kúlẹ̀kúlẹ̀ tó ní èrò. Ìlà tó mọ́.", "A fit that feels like it was always there.": "Ìbámu tó dà bíi pé ó ti wà níbẹ̀ láti ìbẹ̀rẹ̀.", "Form meets the everyday": "Ìrísí bá ìgbé ayé ojoojúmọ́ mu", "Made for your project": "A ṣe fún iṣẹ́ rẹ", "The right frame changes everything.": "Férémù tó tọ́ lè yí ohun gbogbo padà.", "From a single opening to a considered building exterior, explore aluminium systems for the spaces you use every day.": "Láti ihò fèrèsé kan sí ojú ilé tó ní èrò, ṣàwárí ètò aláìmínìọ̀mù fún àwọn àyè tí o ń lò lójoojúmọ́.", "Discuss a project": "Jíròrò iṣẹ́ kan", "The collection": "Àkójọpọ̀ ọjà", "Systems that let the light in.": "Ètò tó ń jẹ́ kí ìmọ́lẹ̀ wọlé.", "Explore the possibilities. We'll help you find the right configuration for your opening, finish and project.": "Ṣàwárí àwọn àǹfààní. A ó ràn ọ́ lọ́wọ́ láti yan ètò, ìparí àti ọjà tó bá iṣẹ́ rẹ mu.", "Ask about a product": "Béèrè nípa ọjà kan", All: "Gbogbo", Windows: "Fèrèsé", Doors: "Ilẹ̀kùn", Facades: "Ojú ilé", Railings: "Ààbò pẹ̀tẹ́lẹ̀", "Made to measure": "A ṣe sí ìwọ̀n", Sliding: "Yíyọ̀", Casement: "Títẹ̀ sí ẹ̀gbẹ́", "Glazed facade": "Ojú ilé gíláàsì", "Project specific": "Fún iṣẹ́ pàtó", "Facade systems": "Ètò ojú ilé", "Glass railing": "Ààbò gíláàsì", Enquire: "Béèrè", "Made with intention": "A ṣe pẹ̀lú èrò", "A better fit starts with listening.": "Ìbámu tó dára bẹ̀rẹ̀ pẹ̀lú fífetí sílẹ̀.", "Every project has its own proportions, priorities and point of view. We work with you to shape an aluminium solution that belongs in the space, down to the finish and the final fit.": "Gbogbo iṣẹ́ ní ìwọ̀n, ohun pàtàkì àti ojú ìwòye tirẹ̀. A bá ọ ṣiṣẹ́ láti ṣe ojútùú aláìmínìọ̀mù tó bá àyè mu, títí dé ìparí iṣẹ́ àti fífi sí ipò rẹ̀.", "Start a conversation": "Bẹ̀rẹ̀ ìjíròrò", "From first sketch to final fit": "Láti àwòrán àkọ́kọ́ dé fífi sí ipò", "A clear process. A considered result.": "Ọ̀nà iṣẹ́ tó ṣe kedere. Àbájáde tó ní èrò.", Understand: "Lílóye", "Measure & plan": "Wíwọ̀n àti ètò", Make: "Ṣíṣe", Fit: "Fífi sí ipò", "Share your project, priorities and the space you are working with.": "Pín iṣẹ́ rẹ, ohun tó ṣe pàtàkì àti àyè tí o ń ṣiṣẹ́ lé lórí.", "Work through dimensions, configuration and finish for your requirements.": "Yan ìwọ̀n, ètò àti ìparí tó bá ohun tí o nílò mu.", "Your aluminium system is prepared to the agreed project details.": "A ó pèsè ètò aláìmínìọ̀mù rẹ gẹ́gẹ́ bí àwọn kúlẹ̀kúlẹ̀ tí a fohùn ṣọ̀kan lé lórí.", "Coordinate the installation and complete the final fit for your space.": "A ó ṣètò fífi sí ipò, kí a sì parí iṣẹ́ náà nínú àyè rẹ.", "Your project, next": "Igbésẹ̀ tó kàn fún iṣẹ́ rẹ", "Let's find the right fit.": "Ẹ jẹ́ ká rí ohun tó bá mu.", "Share a few details about what you're planning. We'll prepare an email draft with your project information.": "Pín àwọn kúlẹ̀kúlẹ̀ díẹ̀ nípa ohun tí o ń gbèrò. A ó pèsè ìwé ìfìránṣẹ́ pẹ̀lú ìsọfúnni iṣẹ́ rẹ.", "Full name": "Orúkọ kíkún", "Your name": "Orúkọ rẹ", "Phone number": "Nọ́ńbà fóònù", "How can we reach you?": "Báwo la ṣe lè kàn sí ọ?", "Email address": "Àdírẹ́sì ìméèlì", "What are you looking for?": "Kí ni o ń wá?", "Select a service": "Yan iṣẹ́ kan", "A little about your project": "Àlàyé díẹ̀ nípa iṣẹ́ rẹ", "(optional)": "(kò pọn dandan)", "Project type, dimensions, location or timing": "Irú iṣẹ́, ìwọ̀n, ibi tàbí àkókò", "Prepare email": "Pèsè ìméèlì", "Your email app should open with the details filled in. If it didn't, email": "Ohun èlò ìméèlì rẹ yẹ kí ó ṣí pẹ̀lú àwọn kúlẹ̀kúlẹ̀. Bí kò bá ṣí, fi ìméèlì ránṣẹ́ sí", Explore: "Ṣàwárí", "Start a project": "Bẹ̀rẹ̀ iṣẹ́ kan", "Get in touch": "Kàn sí wa", "Made for lasting everyday use.": "A ṣe fún lílò ojoojúmọ́ tó pé pípẹ́.", "Aluminium windows, doors and architectural systems for residential and commercial spaces.": "Fèrèsé, ilẹ̀kùn àti ètò aláìmínìọ̀mù fún ilé àti ibi iṣẹ́.", "Sliding, casement, tilt & turn and fixed windows, configured to suit the opening and the room.": "Fèrèsé yíyọ̀, títẹ̀ sí ẹ̀gbẹ́, yíyí àti èyí tí kò ṣí, tí a ṣètò fún ihò àti yàrá náà.", "Folding, sliding, pivot and hinged doors engineered for smooth operation and heavy daily use.": "Ilẹ̀kùn fífọ́, yíyọ̀, yíyípo àti ti ìkọ̀, tí a ṣe fún lílò ojoojúmọ́ tó rọrùn.", "Glazing systems for commercial buildings, showrooms and offices, coordinated with the wider design.": "Ètò gíláàsì fún ilé ìṣòwò, yàrá ìfihàn àti ọ́fíìsì, tó bá àwòrán gbogbogbò mu.", "Glass and bar railings for stairs, balconies and terraces — corrosion-free and low maintenance.": "Ààbò gíláàsì àti ọ̀pá fún àtẹ̀gùn, balikoni àti pẹ̀tẹ́lẹ̀, tí kò tètè bàjẹ́.", "Louvred pergolas, carports and shade canopies built to withstand sun, wind and rain.": "Pergola, ibùdó ọkọ̀ àti àbójú fún oòrùn, ẹ̀fúùfù àti òjò.", "Bespoke aluminium components developed around your drawings, dimensions and finish requirements.": "Ẹ̀yà aláìmínìọ̀mù pàtó tí a ṣe gẹ́gẹ́ bí àwòrán, ìwọ̀n àti ìparí tí o fẹ́.",
  },
  ig: {
    Services: "Ọrụ anyị", Products: "Ngwaahịa", Approach: "Ụzọ ọrụ", Contact: "Kpọtụrụ anyị", "Get a Quote": "Rịọ ọnụahịa", "Aluminium, considered": "Aluminom e jiri nlezianya chepụta", "A clearer view": "Lee ihe nke ọma", "of what's possible.": "maka ihe niile ga-ekwe omume.", "Made-to-measure aluminium windows, doors and architectural systems, shaped around the way you live and build.": "Windo, ọnụ ụzọ na sistem aluminom e mere n'ogo kwesịrị ekwesị maka ibi na iwu ụlọ gị.", "Talk about your project": "Kwuo maka ọrụ gị", "Explore the range": "Lelee ụdị dị iche iche", "Thoughtful details. Clean lines.": "Nkọwa e jiri nlezianya mee. Ahịrị dị ọcha.", "A fit that feels like it was always there.": "Ọ dabara nke ọma dịka ọ dịla ebe ahụ mgbe niile.", "Form meets the everyday": "Ọdịdị dabara na ndụ kwa ụbọchị", "Made for your project": "E mere maka ọrụ gị", "The right frame changes everything.": "Okpokoro kwesịrị ekwesị na-agbanwe ihe niile.", "From a single opening to a considered building exterior, explore aluminium systems for the spaces you use every day.": "Site n'otu oghere ruo n'ihu ụlọ e chepụtara nke ọma, chọpụta sistem aluminom maka ebe ị na-eji kwa ụbọchị.", "Discuss a project": "Kparịta maka ọrụ", "The collection": "Nchịkọta ngwaahịa", "Systems that let the light in.": "Sistem ndị na-eme ka ìhè bata.", "Explore the possibilities. We'll help you find the right configuration for your opening, finish and project.": "Chọpụta ihe ga-ekwe omume. Anyị ga-enyere gị aka ịhọrọ nhazi na mmecha dabara n'ọrụ gị.", "Ask about a product": "Jụọ maka ngwaahịa", All: "Ha niile", Windows: "Windo", Doors: "Ọnụ ụzọ", Facades: "Ihu ụlọ", Railings: "Ihe mgbochi", "Made to measure": "E mere n'ogo kwesịrị ekwesị", Sliding: "Na-amị amị", Casement: "Na-emeghe n'akụkụ", "Glazed facade": "Ihu ụlọ nwere enyo", "Project specific": "Maka otu ọrụ", "Facade systems": "Sistem ihu ụlọ", "Glass railing": "Ihe mgbochi enyo", Enquire: "Jụọ ajụjụ", "Made with intention": "E jiri ebumnuche mee", "A better fit starts with listening.": "Ige ntị bụ mmalite nke ihe dabara nke ọma.", "Every project has its own proportions, priorities and point of view. We work with you to shape an aluminium solution that belongs in the space, down to the finish and the final fit.": "Ọrụ ọ bụla nwere nha, mkpa na echiche nke ya. Anyị na gị na-arụkọ ọrụ iji hazie aluminom ga-adabara ebe ahụ, ruo na mmecha na itinye ya.", "Start a conversation": "Malite mkparịta ụka", "From first sketch to final fit": "Site n'echiche mbụ ruo n'itinye ya", "A clear process. A considered result.": "Usoro doro anya. Nsonaazụ e chepụtara nke ọma.", Understand: "Ịghọta", "Measure & plan": "Ịtụ nha na ịhazi", Make: "Ime ya", Fit: "Itinye ya", "Share your project, priorities and the space you are working with.": "Kekọrịta ọrụ gị, ihe ndị dị mkpa na ebe ị na-arụ ọrụ.", "Work through dimensions, configuration and finish for your requirements.": "Họrọ nha, nhazi na mmecha dabara n'ihe ị chọrọ.", "Your aluminium system is prepared to the agreed project details.": "A ga-akwadebe sistem aluminom gị dịka nkọwa ọrụ unu kwekọrịtara.", "Coordinate the installation and complete the final fit for your space.": "Hazie itinye ya ma mechaa ọrụ ahụ n'ebe gị.", "Your project, next": "Nzọụkwụ ọzọ maka ọrụ gị", "Let's find the right fit.": "Ka anyị chọta nke dabara nke ọma.", "Share a few details about what you're planning. We'll prepare an email draft with your project information.": "Kekọrịta nkọwa ole na ole gbasara atụmatụ gị. Anyị ga-akwadebe ozi email nwere nkọwa ọrụ gị.", "Full name": "Aha zuru ezu", "Your name": "Aha gị", "Phone number": "Nọmba ekwentị", "How can we reach you?": "Kedu ka anyị ga-esi kpọtụrụ gị?", "Email address": "Adreesị email", "What are you looking for?": "Kedu ihe ị na-achọ?", "Select a service": "Họrọ ọrụ", "A little about your project": "Obere nkọwa gbasara ọrụ gị", "(optional)": "(ọ bụghị iwu)", "Project type, dimensions, location or timing": "Ụdị ọrụ, nha, ebe ma ọ bụ oge", "Prepare email": "Kwadebe email", "Your email app should open with the details filled in. If it didn't, email": "Ngwa email gị kwesịrị imepe na nkọwa ndị ahụ. Ọ bụrụ na o meghị, zigara email na", Explore: "Chọpụta", "Start a project": "Malite ọrụ", "Get in touch": "Kpọtụrụ anyị", "Made for lasting everyday use.": "E mere ya ka ọ dịgide n'iji kwa ụbọchị.", "Aluminium windows, doors and architectural systems for residential and commercial spaces.": "Windo, ọnụ ụzọ na sistem aluminom maka ụlọ na ebe azụmahịa.", "Sliding, casement, tilt & turn and fixed windows, configured to suit the opening and the room.": "Windo na-amị amị, na-emeghe n'akụkụ, na-atụgharị na ndị a na-adịghị emeghe, nke dabara n'ọnụ oghere na ime ụlọ.", "Folding, sliding, pivot and hinged doors engineered for smooth operation and heavy daily use.": "Ọnụ ụzọ na-agbakọta, na-amị amị, na-atụgharị na nke nwere mgbanaka, e mere ka ha rụọ ọrụ nke ọma kwa ụbọchị.", "Glazing systems for commercial buildings, showrooms and offices, coordinated with the wider design.": "Sistem enyo maka gine azụmahịa, ebe ngosi na ofis, nke kwekọrọ na atụmatụ niile.", "Glass and bar railings for stairs, balconies and terraces — corrosion-free and low maintenance.": "Ihe mgbochi enyo na ogwe maka steepụ, balakọnị na mbara ihu, nke na-adịghị agba nchara ma dị mfe ilekọta.", "Louvred pergolas, carports and shade canopies built to withstand sun, wind and rain.": "Pergola, ebe a na-adọba mota da rumfa e mere su jure rana, iska da ruwan sama.", "Bespoke aluminium components developed around your drawings, dimensions and finish requirements.": "Abubuwan aluminium na musamman bisa zane-zanenku, ma'auninku da bukatun kammalawa.",
  },
  ha: {
    Services: "Ayyuka", Products: "Kayayyaki", Approach: "Yadda muke aiki", Contact: "Tuntuɓe mu", "Get a Quote": "Nemi ƙiyasin kuɗi", "Aluminium, considered": "Aluminium da tunani", "A clearer view": "Kyakkyawar fahimta", "of what's possible.": "game da abin da zai yiwu.", "Made-to-measure aluminium windows, doors and architectural systems, shaped around the way you live and build.": "Tagogi, ƙofofi da tsarin gini na aluminium da aka ƙera bisa ma'auni, don salon rayuwarku da ginin ku.", "Talk about your project": "Yi magana game da aikinku", "Explore the range": "Duba nau'ikan kayayyaki", "Thoughtful details. Clean lines.": "Cikakkun bayanai masu kyau. Tsararrun layi.", "A fit that feels like it was always there.": "Daidaiton da ya dace da wurin tun farko.", "Form meets the everyday": "Zane ya dace da rayuwar yau da kullum", "Made for your project": "An yi don aikinku", "The right frame changes everything.": "Daidaitaccen firam yana canza komai.", "From a single opening to a considered building exterior, explore aluminium systems for the spaces you use every day.": "Daga buɗewa ɗaya zuwa kyakkyawan fuskar gini, binciki tsarin aluminium don wuraren da kuke amfani da su kullum.", "Discuss a project": "Tattauna aiki", "The collection": "Tarin kayayyaki", "Systems that let the light in.": "Tsarukan da ke shigar da haske.", "Explore the possibilities. We'll help you find the right configuration for your opening, finish and project.": "Binciki zaɓuɓɓuka. Za mu taimaka wajen zaɓar tsarin da ya dace da aikinku.", "Ask about a product": "Tambaya game da kaya", All: "Duka", Windows: "Tagogi", Doors: "Ƙofofi", Facades: "Fuskokin gine-gine", Railings: "Katangar kariya", "Made to measure": "An ƙera bisa ma'auni", Sliding: "Mai zamewa", Casement: "Mai buɗewa gefe", "Glazed facade": "Fuskar gini mai gilashi", "Project specific": "Na musamman ga aiki", "Facade systems": "Tsarin fuskar gini", "Glass railing": "Katangar gilashi", Enquire: "Nemi bayani", "Made with intention": "An yi da manufa", "A better fit starts with listening.": "Daidaito mai kyau yana farawa da sauraro.", "Every project has its own proportions, priorities and point of view. We work with you to shape an aluminium solution that belongs in the space, down to the finish and the final fit.": "Kowane aiki yana da ma'auni, muhimmai da ra'ayinsa. Muna aiki tare da ku don tsara mafitar aluminium da ta dace da wurin, har zuwa kammalawa da girkawa.", "Start a conversation": "Fara tattaunawa", "From first sketch to final fit": "Daga zane na farko zuwa girkawa", "A clear process. A considered result.": "Tsari bayyananne. Sakamako mai kyau.", Understand: "Fahimta", "Measure & plan": "Auna da tsarawa", Make: "Ƙerawa", Fit: "Girkawa", "Share your project, priorities and the space you are working with.": "Bayyana aikinku, muhimman buƙatu da wurin da kuke aiki a ciki.", "Work through dimensions, configuration and finish for your requirements.": "Zaɓi ma'auni, tsari da kammalawa bisa buƙatunku.", "Your aluminium system is prepared to the agreed project details.": "Za a shirya tsarin aluminium bisa cikakkun bayanan da aka amince da su.", "Coordinate the installation and complete the final fit for your space.": "Za a tsara girkawa sannan a kammala daidaitawa a wurinku.", "Your project, next": "Mataki na gaba na aikinku", "Let's find the right fit.": "Mu nemo abin da ya dace.", "Share a few details about what you're planning. We'll prepare an email draft with your project information.": "Bayyana wasu bayanai game da shirin ku. Za mu shirya saƙon imel mai bayanan aikinku.", "Full name": "Cikakken suna", "Your name": "Sunanku", "Phone number": "Lambar waya", "How can we reach you?": "Ta yaya za mu same ku?", "Email address": "Adireshin imel", "What are you looking for?": "Me kuke nema?", "Select a service": "Zaɓi aiki", "A little about your project": "Ƙarin bayani kan aikinku", "(optional)": "(zaɓi ne)", "Project type, dimensions, location or timing": "Nau'in aiki, ma'auni, wuri ko lokaci", "Prepare email": "Shirya imel", "Your email app should open with the details filled in. If it didn't, email": "Ya kamata manhajar imel ta buɗe da bayanan a ciki. Idan ba ta buɗe ba, aika imel zuwa", Explore: "Bincika", "Start a project": "Fara aiki", "Get in touch": "Tuntuɓe mu", "Made for lasting everyday use.": "An yi shi don amfani na yau da kullum na dogon lokaci.", "Aluminium windows, doors and architectural systems for residential and commercial spaces.": "Tagogi, ƙofofi da tsarin aluminium don gidaje da wuraren kasuwanci.", "Sliding, casement, tilt & turn and fixed windows, configured to suit the opening and the room.": "Tagogi masu zamewa, masu buɗewa gefe, masu juyawa da marasa buɗewa, waɗanda suka dace da buɗewa da ɗaki.", "Folding, sliding, pivot and hinged doors engineered for smooth operation and heavy daily use.": "Ƙofofi masu ninkewa, zamewa, juyawa da masu maɗauri, waɗanda aka ƙera don aiki mai sauƙi da amfani kullum.", "Glazing systems for commercial buildings, showrooms and offices, coordinated with the wider design.": "Tsarin gilashi don gine-ginen kasuwanci, wuraren nuni da ofisoshi, wanda ya dace da sauran zane.", "Glass and bar railings for stairs, balconies and terraces — corrosion-free and low maintenance.": "Katangar gilashi da ƙarfe don matakala, baranda da fili, ba sa tsatsa kuma ba sa buƙatar kulawa mai yawa.", "Louvred pergolas, carports and shade canopies built to withstand sun, wind and rain.": "Pergola mai rufi, wurin mota da rumfar inuwa da aka gina don jure rana, iska da ruwan sama.", "Bespoke aluminium components developed around your drawings, dimensions and finish requirements.": "Abubuwan aluminium na musamman da aka tsara bisa zanenku, ma'auninku da buƙatun kammalawa.",
  },
};

const productTranslations: Partial<Record<Language, Dictionary>> = {
  yo: {
    "Sliding Windows": "Fèrèsé Yíyọ̀", "Casement Windows": "Fèrèsé Títẹ̀ sí Ẹ̀gbẹ́", "Folding Doors": "Ilẹ̀kùn Fífọ́", "Sliding Doors": "Ilẹ̀kùn Yíyọ̀", "Curtain Wall Systems": "Ètò Ojú Ilé Aṣọ", "Architectural Facades": "Ojú Ilé Ìkọ́lé", "Glass Railings": "Ààbò Gíláàsì",
  },
  ig: {
    "Sliding Windows": "Windo na-amị amị", "Casement Windows": "Windo na-emeghe n'akụkụ", "Folding Doors": "Ọnụ ụzọ na-apịaji", "Sliding Doors": "Ọnụ ụzọ na-amị amị", "Curtain Wall Systems": "Sistem mgbidi enyo", "Architectural Facades": "Ihu ụlọ nke ụkpụrụ ụlọ", "Glass Railings": "Ihe mgbochi enyo",
  },
  ha: {
    "Sliding Windows": "Tagogi masu zamewa", "Casement Windows": "Tagogi masu buɗewa gefe", "Folding Doors": "Ƙofofi masu ninkewa", "Sliding Doors": "Ƙofofi masu zamewa", "Curtain Wall Systems": "Tsarin bangon gilashi", "Architectural Facades": "Fuskokin gine-gine", "Glass Railings": "Katangar gilashi",
  },
};

const pidginTranslations: Dictionary = {
  Services: "Wetin we do",
  Products: "Our products",
  Approach: "How we dey work",
  Contact: "Talk to us",
  "Get a Quote": "Ask for price",
  "Aluminium, considered": "Aluminium wey dem plan well",
  "A clearer view": "See better",
  "of what's possible.": "wetin fit happen.",
  "Made-to-measure aluminium windows, doors and architectural systems, shaped around the way you live and build.": "Aluminium windows, doors and building systems wey dem make to size, fit how you dey live and build.",
  "Talk about your project": "Make we talk about your project",
  "Explore the range": "See wetin we get",
  "Thoughtful details. Clean lines.": "Every detail get sense. Clean design.",
  "A fit that feels like it was always there.": "E go fit your space like say e dey there from the beginning.",
  "Form meets the everyday": "Fine design for everyday life",
  "Made for your project": "We make am for your project",
  "The right frame changes everything.": "Correct frame fit change everything.",
  "From a single opening to a considered building exterior, explore aluminium systems for the spaces you use every day.": "From one window opening reach the outside of the whole building, check aluminium systems for the spaces wey you dey use every day.",
  "Discuss a project": "Make we talk about your project",
  "The collection": "Our products",
  "Systems that let the light in.": "Systems wey dey bring light enter.",
  "Explore the possibilities. We'll help you find the right configuration for your opening, finish and project.": "See wetin fit work. We go help you choose the right style, finish and setup for your project.",
  "Ask about a product": "Ask about product",
  All: "All",
  Windows: "Windows",
  Doors: "Doors",
  Facades: "Building fronts",
  Railings: "Railings",
  "Made to measure": "We make am to size",
  Sliding: "Sliding",
  Casement: "Side-opening",
  "Glazed facade": "Glass building front",
  "Project specific": "For this project",
  "Facade systems": "Building-front systems",
  "Glass railing": "Glass railing",
  Enquire: "Ask us",
  "Sliding Windows": "Sliding Windows",
  "Casement Windows": "Side-opening Windows",
  "Folding Doors": "Folding Doors",
  "Sliding Doors": "Sliding Doors",
  "Curtain Wall Systems": "Glass Wall Systems",
  "Architectural Facades": "Building Fronts",
  "Glass Railings": "Glass Railings",
  "Made with intention": "Made with care",
  "A better fit starts with listening.": "A better fit start when we listen.",
  "Every project has its own proportions, priorities and point of view. We work with you to shape an aluminium solution that belongs in the space, down to the finish and the final fit.": "Every project get its own size, priorities and style. We go work with you to choose aluminium wey fit the space well, from the finish reach the final fitting.",
  "Start a conversation": "Make we start the talk",
  "From first sketch to final fit": "From first drawing reach final fitting",
  "A clear process. A considered result.": "Clear steps. Result wey dem plan well.",
  Understand: "Understand am",
  "Measure & plan": "Measure and plan am",
  Make: "Make am",
  Fit: "Fit am",
  "Share your project, priorities and the space you are working with.": "Tell us about your project, wetin matter to you and the space wey you dey work on.",
  "Work through dimensions, configuration and finish for your requirements.": "We go agree the size, setup and finish wey you need.",
  "Your aluminium system is prepared to the agreed project details.": "We go prepare your aluminium system based on wetin we agree for the project.",
  "Coordinate the installation and complete the final fit for your space.": "We go arrange the installation and fit am well for your space.",
  "Your project, next": "The next step for your project",
  "Let's find the right fit.": "Make we find wetin fit well.",
  "Share a few details about what you're planning. We'll prepare an email draft with your project information.": "Tell us small about wetin you dey plan. We go prepare email with your project details.",
  "Full name": "Full name",
  "Your name": "Your name",
  "Phone number": "Phone number",
  "How can we reach you?": "How we fit reach you?",
  "Email address": "Email address",
  "What are you looking for?": "Wetin you dey look for?",
  "Select a service": "Choose one service",
  "A little about your project": "Small info about your project",
  "(optional)": "(you fit leave am)",
  "Project type, dimensions, location or timing": "Project type, size, location or when you need am",
  "Prepare email": "Prepare email",
  "Your email app should open with the details filled in. If it didn't, email": "Your email app suppose open with the details inside. If e no open, send email to",
  Explore: "Explore",
  "Start a project": "Start project",
  "Get in touch": "Talk to us",
  "Made for lasting everyday use.": "Made to last for everyday use.",
  "Aluminium windows, doors and architectural systems for residential and commercial spaces.": "Aluminium windows, doors and building systems for homes and business spaces.",
  "Aluminium Windows": "Aluminium Windows",
  "Sliding, casement, tilt & turn and fixed windows, configured to suit the opening and the room.": "Sliding, side-opening, tilt-and-turn and fixed windows, set up to fit the opening and room.",
  "Doors & Entrances": "Doors and Entrances",
  "Folding, sliding, pivot and hinged doors engineered for smooth operation and heavy daily use.": "Folding, sliding, pivot and hinged doors made to open smoothly and handle everyday use.",
  "Curtain Walls & Facades": "Glass Walls and Building Fronts",
  "Glazing systems for commercial buildings, showrooms and offices, coordinated with the wider design.": "Glass systems for business buildings, showrooms and offices, planned to match the full design.",
  "Railings & Balustrades": "Railings and Balustrades",
  "Glass and bar railings for stairs, balconies and terraces — corrosion-free and low maintenance.": "Glass and metal railings for stairs, balconies and terraces. Dem no dey rust and easy to maintain.",
  "Pergolas & Canopies": "Pergolas and Canopies",
  "Louvred pergolas, carports and shade canopies built to withstand sun, wind and rain.": "Pergolas, carports and shade covers wey fit handle sun, wind and rain.",
  "Custom Fabrication": "Custom Aluminium Work",
  "Bespoke aluminium components developed around your drawings, dimensions and finish requirements.": "Custom aluminium parts wey we go make based on your drawings, sizes and finish choice.",
};

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: "en",
  setLanguage: () => undefined,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem("oye-language");
      return LANGUAGES.some((item) => item.code === saved) ? (saved as Language) : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("oye-language", language);
    } catch {
      // Language selection still works for this visit when storage is unavailable.
    }
  }, [language]);

  const value = { language, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  const translate = (text: string) => languageText(context.language, text);
  return { ...context, t: translate };
}

export function languageText(language: Language, text: string) {
  if (language === "en") return text;
  if (language === "pcm") return pidginTranslations[text] ?? text;
  return translations[language]?.[text] ?? productTranslations[language]?.[text] ?? text;
}
