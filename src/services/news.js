
import { _api_key, language, category, articles_url, getimages_url} from '../config/rest_config';


export async function getArticles(url){

    try {
        let articles = await fetch(url,{
            headers:{  }
        });
     let result = await articles.json();
        // let result ={
        //            "title": "Homepage",
        //            "link": "https://www.tageblatt.lu/",
        //            "id": 0,
        //            "version": "2.0",
        //            "packages":[
        //                {
        //                    "nid": "814175",
        //                    "title": "Generaldirektor Reimer in der Kritik – Präsident Mischo dementiert Gerüchte über möglichen Führungswechsel ",
        //                    "body": "<strong class=\"teaser text-left\"><p></p>\n<p>Mitten in der Coronakrise kursieren im Escher CHEM Gerüchte, dass Generaldirektor Hansjörg Reimer abgesetzt werden soll. Sowohl Reimer selbst, als auch CHEM-Präsident Georges Mischo dementieren. Gleichwohl fällt auf, dass der Generaldirektor nicht Teil der krankenhausinternen Krisenzelle ist, die der Verwaltungsrat zur Bewältigung der Coronapandemie eingesetzt hat. Zudem ist Reimers eher liberaler Kurs spätestens seit dem Rücktritt des medizinischen Direktors Claude Birgen umstritten. </p>\n<p></p></strong>\n<p class=\"text\">An der Spitze des Escher Krankenhauses „Centre hospitalier Emile Mayrisch“ (CHEM) könnte es spätestens nach Ende der Coronakrise zu einem Führungswechsel kommen. Laut <i>Tageblatt</i>-Informationen ist Generaldirektor Hansjörg Reimer schon seit einigen Monaten umstritten. Zuletzt kursierten im CHEM Gerüchte, dass Reimer vom Verwaltungsrat „kaltgestellt“ und „beurlaubt“ werden soll. </p>\n<p class=\"text\">Im Rahmen der Planung des neuen Südspidols hatte ein Zerwürfnis zwischen Generaldirektor Reimer und dem medizinischen Direktor Dr. Claude Birgen für Aufregung gesorgt. Vor zwei Monaten hatte sich die Situation zugespitzt. Am 10. Februar kam es in einer Verwaltungsratssitzung des CHEM zu einem <a href=\"https://www.tageblatt.lu/?post_type=post&#038;p=802613\">Eklat, der den Rücktritt Birgens zur Folge hatte</a>. Birgen wurde vorübergehend von Dr. Robert Muller als medizinischem Direktor des CHEM ersetzt. „Do hat et mol eng Kéier gescheppert“, kommentierte der CHEM-Präsident und Escher Bürgermeister Georges Mischo (CSV) am Samstag den Vorfall. So etwas komme in jedem Verein ab und zu vor. </p>\n<figure class=\"image-component img-fluid center\"><img src=\"https://www.tageblatt.lu/wp-content/uploads/2020/04/57622-740x493.jpg\"><figcaption> &bdquo;Do hat et mol eng K&eacute;ier gescheppert&ldquo;, kommentierte der CHEM-Verwaltungsratspr&auml;sident und Escher B&uuml;rgermeister Georges Mischo (CSV) den R&uuml;cktritt des medizinischen Direktors, Dr. Claude Birgen. <small>Editpress/Julien Garroy</small></figcaption></figure>\n<p class=\"text\">Konkret ging es bei der Auseinandersetzung um die Auslagerung bestimmter ambulanter Dienste, die bislang exklusiv den Krankenhäusern vorbehalten sind, künftig aber auch in privaten Gemeinschaftspraxen angeboten werden sollen. Vor allem die Vereinigung der Ärzte und Zahnärzte in Luxemburg (AMMD) hatte sich zuletzt für eine fortschreitende Privatisierung des Gesundheitssystems eingesetzt. Auch Reimer war diesem Ansatz zugeneigt, während Birgen dem eher kritisch gegenüberstand. Die Corona-Pandemie scheint Birgen nun recht zu geben. In den vergangenen Wochen wurde von allen Seiten betont, wie wichtig es sei, in Krisenzeiten auf ein starkes öffentliches Gesundheitssystem zurückgreifen zu können. </p>\n<h3 class=\"crosshead text-left\"></p>\n<p>„Machtwort“ des Präsidenten</p>\n<p></h3>\n<p class=\"text\">Anfang März stand Reimer dann offenbar erneut in der Kritik. Das CHEM hatte mit Verzug auf die Anweisungen von  Gesundheitsministerin Paulette Lenert (LSAP) in der Coronakrise reagiert. So hatte das Escher Krankenhaus die Kontrollen an den Haupteingängen und die Einschränkung der Patientenbesuche vergleichsweise spät eingeführt. Die Poliklinik sei erst geschlossen worden, nachdem er als CHEM-Verwaltungsratspräsident ein „Machtwort“ gesprochen habe, sagt Mischo. </p>\n<p class=\"text\">Seitdem steht im CHEM die Bewältigung der Coronakrise ganz klar im Vordergrund. Vor einem Monat hat der Verwaltungsrat eine interne Krisenzelle eingesetzt, die das Vorgehen gegen das Coronavirus koordiniert. Geleitet wird die Zelle vom Onkologen <a href=\"https://www.tageblatt.lu/headlines/dr-serge-meyer-leitet-die-krisenzelle-im-chem/\">Dr. Serge Meyer</a>, Präsident des „Conseil médical“ des CHEM und Mitglied des Verwaltungsrats. Neben Meyer sind der neue medizinische Direktor Dr. Robert Muller, der Anästhesist Dr. Touraj Rastegar, der Pflegedirektor Serge Haag, der Verwaltungs- und Finanzdirektor Daniel Cardao, CHEM-Präsident Georges Mischo und der Chefkoordinator der Notaufnahme, Nico Rinaldis, Teil der Zelle. Generaldirektor Hansjörg Reimer gehört der Krisenzelle nicht an. </p>\n<p class=\"text\">Meyer und Rinaldis seien bereits bei der Vigilnat-Anti-Terrorübung im Januar 2019 in der Rockhal auf Belval dabei gewesen, deshalb sei die Wahl für die Leitung der Krisenzelle auf den erfahrenen Meyer gefallen, sagt Georges Mischo auf Nachfrage. Laut <i>Tageblatt</i>-Informationen waren sich die Mitglieder des Verwaltungsrats des CHEM einig, dass Reimer die Krisenzelle nicht führen könne. Auch an der Kommunikation über das Coronavirus war Reimer zuletzt kaum noch beteiligt. Mischo und Meyer haben diese Aufgabe in den letzten drei Wochen übernommen. </p>\n<div class=\"blockquote text-left\"><blockquote>Hansjörg Reimer bleibt unser Generaldirektor. Bis jetzt wurde nichts anderes entschieden</blockquote><span class=\"author\">Georges Mischo, </span><span class=\"function\">Verwaltungsratspräsident des CHEM und Escher Bürgermeister</span></div>\n<p class=\"text\">„Im Moment sieht es so aus, als ob ich Generaldirektor bleiben würde“, antwortet Reimer auf die Frage, wer künftig dieses Amt bekleiden werde. Verglichen mit anderen Krankenhäusern sei die Leitung im CHEM zurzeit „etwas speziell“, aber er habe weiterhin seine Funktionen, gehe weiterhin regelmäßig zur Arbeit, sehe weiterhin die Truppen und sei weiterhin an der Kommunikation beteiligt, sagt Reimer. Auch CHEM-Präsident Mischo unterstreicht: „Hansjörg Reimer bleibt unser Generaldirektor. Bis jetzt wurde nichts anderes entschieden“.</p>\n<p class=\"text\">Auch ungeachtet der Coronakrise stehe das CHEM vor den größten Herausforderungen der letzten 20 Jahre, sagt Reimer. „Das Krankenhausgesetz hat dazu geführt, dass wir bestimmte Dienste auslagern und andere verkleinern mussten. Das hat natürlich für sehr viel Unruhe gesorgt. Zusätzlich kommen Veränderungen auf digitaler Ebene auf uns zu, die sicherlich schwierig werden. Und natürlich das Dossier Südspidol, das ebenfalls nicht einfach wird“, erläutert der Generaldirektor.</p>\n<h3 class=\"crosshead text-left\"></p>\n<p>Verwaltungsratssitzung am 20. April</p>\n<p></h3>\n<p class=\"text\">Um das Personal nicht zu beunruhigen, gehe es dem CHEM nun vor allem darum, darauf zu achten, dass keine Informationen nach außen dringen, heißt es aus krankenhausnahen Kreisen. Erst wenn die Coronakrise professionell gemeistert sei, werde über andere Themen geredet. Darüber hinaus könne Reimer nicht von heute auf morgen entlassen werden, weil er sich seit seinem Amtsantritt vor zweieinhalb Jahren intensiv mit den wichtigen Dossiers beschäftigt hat. Durch die Nichtaufnahme in die Krisenzelle seien Reimers Befugnisse als Generaldirektor aber unmissverständlich beschnitten worden. </p>\n<figure class=\"image-component img-fluid center\"><img src=\"https://www.tageblatt.lu/wp-content/uploads/2020/04/57623_cx__cy__cw__ch_-740x493.jpg\"><figcaption>Dr. Serge Meyer (r.) leitet die interne Corona-Krisenzelle des CHEM, der auch der neue medizinische Direktor Dr. Robert Muller (l.) angeh&ouml;rt. <small>Editpress/Alain Rischard</small></figcaption></figure>\n<p class=\"text\"><i>Tageblatt</i>-Informationen zufolge sollte Reimer schon im März dieses Jahres vom Verwaltungsrat beurlaubt werden, doch wegen der Krise fiel die Vorstandssitzung aus und die Entscheidung wurde vertagt. Die nächste Verwaltungsratssitzung ist für den 20. April geplant. „Am 20. April werden wir sehen, wie wir mit der Kündigung von Dr. Birgen umgehen und ob wir die Stelle neu ausschreiben müssen“, sagt Hansjörg Reimer. Mischo erklärt, dass es eine „normale“ Verwaltungsratssitzung werde, denn das „Daily-Business“ müsse trotz Krise weitergehen. Wegen des von der Regierung verhängten Baustopps seien die Aushubarbeiten auf dem Gelände des Südspidols ausgesetzt worden. Dadurch werde der Bau weiter in Verzug geraten.</p>\n<p class=\"text\">Der Leiter der Krisenzelle, Dr. Serge Meyer, wollte sich auf Nachfrage nicht dazu äußern, ob er für das Amt des Generaldirektors zur Verfügung stehe. Er sei seit 30 Jahren „Intensiv“-Mediziner mit Herz und Seele, sein Einsatz im CHEM habe nichts mit irgendwelchen Titeln zu tun, antwortete Meyer auf eine schriftliche Anfrage des Tageblatt. Es sei aber unausweichlich, dass sich bestimmte Ärzte schon in Stellung bringen, mutmaßt eine andere, dem CHEM nahestehende Quelle.</p>\n",
        //                    "chapo": "",
        //                    "format": false,
        //                    "pubDate": "1586850898",
        //                    "updateDate": "1586709335",
        //                    "version": "2.0",
        //                    "type": "package",
        //                    "freeaccess": "false",
        //                    "url": "/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/",
        //                    "foretitle": null,
        //                    "subtitle": null,
        //                    "barette": null,
        //                    "byline": null,
        //                    "authors": [
        //                        {
        //                            "nid": "6",
        //                            "name": "Luc Laboulle",
        //                            "email": "llaboulle@editpress.lu",
        //                            "avatar_url": "http://preprod.tageblatt.lu/wp-content/uploads/2017/06/avatar_user_6_1497629419-64x64.png"
        //                        }
        //                    ],
        //                    "mainDestinationName": "Headlines",
        //                    "mainPost": "true",
        //                    "object_relations": [
        //                        {
        //                            "object_type": "image",
        //                            "relation_type": "scald_image",
        //                            "uri": "1586709327_57621-jpg"
        //                        },
        //                        {
        //                            "object_type": "links_list",
        //                            "relation_type": "dpicontenttypes",
        //                            "uri": "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/"
        //                        }
        //                    ],
        //                    "object_definitions": {
        //                        "1586709327_57621-jpg": {
        //                            "nid": "814179",
        //                            "type": "image",
        //                            "caption": "&bdquo;Im Moment sieht es so aus, als ob ich Generaldirektor bleiben w&uuml;rde&ldquo;, kommentiert CHEM-Generaldirektor Hansj&ouml;rg Reimer die Ger&uuml;chte um seine Absetzung.",
        //                            "credit": null,
        //                            "width": "2600",
        //                            "height": "1624",
        //                            "crops": {
        //                                "small": "dpi_small",
        //                                "medium": "dpi_medium",
        //                                "large": "dpi_large"
        //                            },
        //                            "crop_definitions": {
        //                                "dpi_small": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57621_cx__cy__cw__ch_-256x144.jpg"
        //                                },
        //                                "dpi_medium": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57621_cx__cy__cw__ch_-512x288.jpg"
        //                                },
        //                                "dpi_large": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57621_cx__cy__cw__ch_-922x576.jpg"
        //                                }
        //                            }
        //                        },
        //                        "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/": {
        //                            "nid": "",
        //                            "type": "links_list",
        //                            "title": "Mehr vom Tageblatt",
        //                            "links": [
        //                                {
        //                                    "nid": "814175",
        //                                    "type": "linktype",
        //                                    "title": "Generaldirektor Reimer in der Kritik – Präsident Mischo dementiert Gerüchte über möglichen Führungswechsel ",
        //                                    "url": "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/"
        //                                },
        //                                {
        //                                    "nid": "814170",
        //                                    "type": "linktype",
        //                                    "title": "Elf Neuinfektionen an Ostern, Zahl der Toten klettert auf 66",
        //                                    "url": "https://www.tageblatt.lu/headlines/elf-neuinfektionen-an-ostern-zahl-der-toten-klettert-auf-66/"
        //                                },
        //                                {
        //                                    "nid": "802613",
        //                                    "type": "linktype",
        //                                    "title": "Eklat am CHEM: Medizinischer Direktor Claude Birgen tritt zurück",
        //                                    "url": "https://www.tageblatt.lu/headlines/eklat-am-chem-medizinischer-direktor-claude-birgen-tritt-zurueck/"
        //                                },
        //                                {
        //                                    "nid": "814167",
        //                                    "type": "linktype",
        //                                    "title": "Emaischen goes online",
        //                                    "url": "https://www.tageblatt.lu/headlines/emaischen-goes-online/"
        //                                },
        //                                {
        //                                    "nid": "814165",
        //                                    "type": "linktype",
        //                                    "title": "Migranten auf Rettungsschiff sollen in Quarantäne auf See",
        //                                    "url": "https://www.tageblatt.lu/headlines/migranten-auf-rettungsschiff-sollen-in-quarantaene-auf-see/"
        //                                }
        //                            ]
        //                        }
        //                    },
        //                    "comments": {
        //                        "count": 0,
        //                        "list": []
        //                    },
        //                    "shares": []
        //                },
        //                {
        //                    "nid": "814119",
        //                    "title": "Polternde Provinzfürsten: Populismus in Zeiten der Krise",
        //                    "body": "<p class=\"text\">Erst die Augen schließen, dann weitersehen: So oder so ähnlich wirkt der politische Umgang mit Blick auf verlässliches Zahlenmaterial zur Corona-Krise. Während in Luxemburg am Mittwoch der Kick-off einer <a href=\"https://www.tageblatt.lu/headlines/die-studie-auf-der-luxemburgs-hoffnung-ruht/\">Dunkelziffer-Studie</a> war, gab es gestern in <a href=\"https://www.tageblatt.lu/headlines/studie-gibt-erstmals-aufschluss-ueber-infizierten-dunkelziffer/\">Österreich</a> erste Ergebnisse zu einem ähnlichen Unterfangen. Das ketzerische Ziel: endlich verlässliche Daten in Zeiten völliger Ungewissheit erhalten. Ob solche Forschungsergebnisse jedoch politisch ernst genommen werden, hängt stark vom Timing, der Methode, den vorläufigen Ergebnissen – und vor allem von den wirtschaftspolitischen Zielen einer Regierung ab.</p>\n<p class=\"text\">Vielleicht wundert sich der eine oder andere deswegen über wissenschaftliche Ansprüche in Krisenzeiten: „Ma hunn déi soss keng Péng?“ Solche Zweifel sind durchaus legitim und angesichts der Schwere der Krise nicht zu unterschätzen. Allerdings ist die Wissenschaft, wenn sie unabhängig und aussagekräftig arbeiten kann, der verlässlichste Partner einer kritischen Öffentlichkeit, um Politiker während einer Gesundheitskrise zu kontrollieren. Die Alternative: billige polemische Spielchen, wie sie sich derzeit in Luxemburg auf kommunaler Ebene entfalten. Der feuchte Traum eines jeden Krisen-Populisten: „<a href=\"https://www.tageblatt.lu/headlines/da-es-zu-wenige-gibt-kaempft-die-ganze-welt-um-masken/\">Masken für alle!</a>“ </p>\n<p class=\"text\">Gerade die CSV versucht, sich mit solchen plumpen Aktionen Gehör zu verschaffen. Wer sich aber auf dieses Niveau herablässt, scheitert gleich in zweierlei Hinsicht: Weder das aktuelle Krisenmanagement der Regierung noch bevorstehende Exit-Strategie-Maßnahmen werden dadurch kontrollierbarer. Es ist politische <a href=\"https://www.tageblatt.lu/headlines/gesundheitsministerin-beteuert-es-mangelt-nicht-an-material-und-produzenten/\">Augenwischerei</a> – und nicht weniger als unverantwortlich, in einer derart sensiblen Situation auch nur ansatzweise daran zu denken, politisches Kapital aus der Angst der Menschen zu schlagen. </p>\n<p class=\"text\">Die Ursachen für so viel <a href=\"https://www.tageblatt.lu/headlines/lebensgefaehrlicher-opportunismus-weshalb-kritiker-in-der-coronakrise-unerwuenscht-sind/\">Opportunismus</a> liegen auf der Hand: Es ist mühsam, sich mit <a href=\"https://www.tageblatt.lu/headlines/strenge-hygiene-koennte-weg-aus-dem-lockdown-ermoeglichen/\">Studien</a> herumzuplagen. Griffige Kritik lässt sich wahrlich mit anderen Themen leichter formulieren und an seine Wähler bringen. Am Resultat des Populismus in Zeiten der Corona-Krise ändert es nichts: Die Taktik ist durchsichtig, die Attitüde unsolidarisch. Dabei könnte eine Oppositionspartei, die das nötige Fingerspitzengefühl besitzt, durchaus eine <a href=\"https://www.tageblatt.lu/headlines/wenn-der-held-im-kittel-ein-risikopatient-ist/\">vorbildliche Kritikfunktion</a> in diesen schweren Zeiten entfalten.</p>\n<p class=\"text\">Denn die Diskussion über Studien und deren Nutzen ist kein Selbstzweck gelangweilter Schöngeister. Sie bietet vielmehr die Grundlage zur rationalen Beurteilung des zentralen Spannungsfelds dieser Krise: soziale und gesundheitliche mit wirtschaftspolitischen Zwängen in Einklang zu bringen. Die Grenze zwischen Leben und Jobs retten ist fließend. Sich gegenüber stehen dabei Gesundheitsexperten und Unternehmer. Sie sind die zentralen Player, sie beeinflussen Luxemburgs Regierung. Ihre Erwartungshaltung könnte kaum gegensätzlicher sein: den Lockdown so lange wie nötig aufrechterhalten vs. am liebsten noch heute zurück zum Business as usual. Ihnen sollte man sehr genau zuhören, sie muss man ernst nehmen – nicht aber polternde Provinzfürsten.</p>\n",
        //                    "chapo": "",
        //                    "format": false,
        //                    "pubDate": "1586553300",
        //                    "updateDate": "1586560858",
        //                    "version": "2.0",
        //                    "type": "package",
        //                    "freeaccess": "true",
        //                    "url": "/headlines/polternde-provinzfuersten-populismus-in-zeiten-der-krise/",
        //                    "foretitle": null,
        //                    "subtitle": null,
        //                    "barette": null,
        //                    "byline": null,
        //                    "authors": [
        //                        {
        //                            "nid": "4",
        //                            "name": "Dhiraj Sabharwal",
        //                            "email": "dsabharwal@tageblatt.lu",
        //                            "avatar_url": "http://preprod.tageblatt.lu/wp-content/uploads/2017/06/avatar_user_4_1497628873-64x64.png"
        //                        }
        //                    ],
        //                    "mainDestinationName": "Headlines",
        //                    "mainPost": "false",
        //                    "object_relations": [
        //                        {
        //                            "object_type": "image",
        //                            "relation_type": "scald_image",
        //                            "uri": "1586560855_57586-jpg"
        //                        },
        //                        {
        //                            "object_type": "links_list",
        //                            "relation_type": "dpicontenttypes",
        //                            "uri": "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/"
        //                        }
        //                    ],
        //                    "object_definitions": {
        //                        "1586560855_57586-jpg": {
        //                            "nid": "814126",
        //                            "type": "image",
        //                            "caption": "Her mit den Masken oder ich spiele ein Lied: Michel Wolter (CSV) kritisiert die Krisenpolitik der Regierung&nbsp;",
        //                            "credit": null,
        //                            "width": "2600",
        //                            "height": "1883",
        //                            "crops": {
        //                                "small": "dpi_small",
        //                                "medium": "dpi_medium",
        //                                "large": "dpi_large"
        //                            },
        //                            "crop_definitions": {
        //                                "dpi_small": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57586_cx__cy__cw__ch_-256x144.jpg"
        //                                },
        //                                "dpi_medium": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57586_cx__cy__cw__ch_-512x288.jpg"
        //                                },
        //                                "dpi_large": {
        //                                    "url": "https://www.tageblatt.lu/wp-content/uploads/2020/04/57586_cx__cy__cw__ch_-795x576.jpg"
        //                                }
        //                            }
        //                        },
        //                        "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/": {
        //                            "nid": "",
        //                            "type": "links_list",
        //                            "title": "Mehr vom Tageblatt",
        //                            "links": [
        //                                {
        //                                    "nid": "814175",
        //                                    "type": "linktype",
        //                                    "title": "Generaldirektor Reimer in der Kritik – Präsident Mischo dementiert Gerüchte über möglichen Führungswechsel ",
        //                                    "url": "https://www.tageblatt.lu/headlines/generaldirektor-reimer-in-der-kritik-praesident-mischo-dementiert-geruechte-ueber-moeglichen-fuehrungswechsel/"
        //                                },
        //                                {
        //                                    "nid": "814170",
        //                                    "type": "linktype",
        //                                    "title": "Elf Neuinfektionen an Ostern, Zahl der Toten klettert auf 66",
        //                                    "url": "https://www.tageblatt.lu/headlines/elf-neuinfektionen-an-ostern-zahl-der-toten-klettert-auf-66/"
        //                                },
        //                                {
        //                                    "nid": "802613",
        //                                    "type": "linktype",
        //                                    "title": "Eklat am CHEM: Medizinischer Direktor Claude Birgen tritt zurück",
        //                                    "url": "https://www.tageblatt.lu/headlines/eklat-am-chem-medizinischer-direktor-claude-birgen-tritt-zurueck/"
        //                                },
        //                                {
        //                                    "nid": "814167",
        //                                    "type": "linktype",
        //                                    "title": "Emaischen goes online",
        //                                    "url": "https://www.tageblatt.lu/headlines/emaischen-goes-online/"
        //                                },
        //                                {
        //                                    "nid": "814165",
        //                                    "type": "linktype",
        //                                    "title": "Migranten auf Rettungsschiff sollen in Quarantäne auf See",
        //                                    "url": "https://www.tageblatt.lu/headlines/migranten-auf-rettungsschiff-sollen-in-quarantaene-auf-see/"
        //                                }
        //                            ]
        //                        }
        //                    },
        //                    "comments": {
        //                        "count": 14,
        //                        "list": [
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "De Poltermischi a seng Leit, a blast from the past.\r\nHoffentlech kommen se ni méi erëm.",
        //                                "comment_date": "2020-04-12 17:10:01"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "@Alain Thill \r\n\r\n\r\n\"Der feuchte Traum eines jeden Krisen-Populisten: „Masken für alle!“\r\nUnd die Maske von Zorro für Michel WOLTER!\"\r\n\r\nWeil er schwarz ist oder weil sie Mund und Nase nicht bedeckt?",
        //                                "comment_date": "2020-04-12 17:03:56"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Die schwarze Bulldogge hat wieder mal eine Gelegenheit verpasst den Mund zu halten.",
        //                                "comment_date": "2020-04-12 12:24:41"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Der feuchte Traum eines jeden Krisen-Populisten: „Masken für alle!“ \nUnd die Maske von Zorro für Michel WOLTER!",
        //                                "comment_date": "2020-04-11 18:41:46"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "einfach mal etwas weiter ueber den tellerrand blicken und schon ist optimismus angesagt.neugierig geworden weil israel 95 todesfaelle durch corona hat bei 9 millionen einwohner habe ich mal die jerusalem post angeklickt.in einem artikel wird geschrieben dass es 100 prozent erfolgreiche plasmatherapie sogar fuer schwerste faelle gibt.ein anderer artikel handelt ueber die zuversicht der israelischen forscher in drei monaten eine schluckimpfung kommerzualisieren zu koennen weil das neue virus sich nur unwesentlich von anderen bekannten viren unterscheidet die menschen befallen.man reibt sich die augen.",
        //                                "comment_date": "2020-04-11 18:04:30"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "@Kutten: Ich verstehe absolut die Sorgen verschiedener Betriebe, aber gemäss der kapitalistischem Doktrin überlebt nur der Finanzstarke, sprich der in Zeiten des Überflusses wohl anhand der  Gewinne  Rücklagen „ en Aapel fir den Duscht“ gemacht hat. Naiv wäre der , der jetzt glaubt es würde alles so weiterlaufen, wie vor der Krise, wo die Spass- und Konsumgesellschaft sorgenlos das Geld verprasst, dem Schuldenmachen gefrönt, die Zukunft nicht abgesichert hat , sich auf eventuelle Krisen, Katastrophen vorzubereiten. Wir sollten die Krise nutzen , unsere Lebensweise zu überdenken, weniger Wirtschaftswachstum , den Menschen , die Natur in den Mittelpunkt stellen. Dieses Virus war eine Warnung , nutzen wir diesen Wink zum Umdenken. Übrigens bin ich der Meinung , jeder verantwortungsvoller, seriöser , arbeitsbewusster Handwerker, Händler.... wird auch Krisenzeiten , das Danach überleben. Wenn Sie nun meinen , betreffend meine Person , ich müsste auf vieles verzichten , ich habe schon vor dieser Krise dem Konsumrausch, dem Reisen , den Modetrends,....... entsagt, mir  liegt mehr das Minimale, was jetzt zu Krisenzeiten , einem positiv zugutekommt. Glauben Sie mir, nach dieser Krise ist nichts mehr wie es einmal war.",
        //                                "comment_date": "2020-04-11 16:23:35"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "@ Infalt Roger\r\n\r\nGudden Metten,\r\n\r\nWouhier wësst dir dass dat eng Differenz vun 2% ass?\r\n\r\n\r\nBescht Gréiss,",
        //                                "comment_date": "2020-04-11 14:48:05"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Här J. Scholer, ma bravo zu ärer Meenung !! Mat der do Zielsetzung sinn an 6 Wochen 50% vun den klengen an mettelgroussen Firmen Faillitte, trotz den Mossnahmen dei den Staat geholl huet. An dann wier dir den eischten den domm aus der Wäsch geif kucken, wann dir geift mierken dass een dei „ewig unzufriedner, dem Profit und Profiteurentum anhängender Zeitgenossen“ awer nach brauch fir Stéiren an Sozial Laschten ze bezuehlen. Esou onsolidaresch geingen iwwer 8.000 Menschen, dei Problemer hunn wei den Moment keng aner Groupe hei am Land. Ech soen villmols merci.",
        //                                "comment_date": "2020-04-11 14:36:48"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "D'CSV steet am Abseits, si ass an dëser Zäit nët gefrot a, wéi hier Spëtzepolitiker beweise, kloer iwwerfuerdert. De Mischi, mat sengem Brettellspiano wier gutt beroden, sech méi zeréckzehalen. d'CSVlauer/innen solle sech e Beispill un eiser Gesondheetsministesch, der Madame Lenert, huelen a si bei hierer schwéierer Aarbecht op d'mannst moralesch ënnerstëtzen. De Mischi a seng Leit kënne jo elo dëser Deeg klibbere goen, wann hinne soss näischt besseres afällt!",
        //                                "comment_date": "2020-04-11 14:19:57"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "@ Infalt Roger\r\n\r\n\"mat esou Masken ëm 2 (!) Prozent méi kleng ewéi ouni Mask\"\r\n\r\nEch froe mech, wéi esou Theorie kënnen zustaan kommen, vu dass et ethesch net vertrietbar ass, fir de Leit de Virus an d'Gesiicht ze blosen.\r\n\r\n2 Prozent, 20, 50, 100 Prozent, dat sinn alles nëmme Meenungen. Kee weess et wierklech ...",
        //                                "comment_date": "2020-04-11 13:26:00"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Gesundheitsexperten und \"Unternehmer\" ?\r\n\r\nEs sind wohl eher Gesundheits- und Wirtschafts-Experten, die die Regierung \"beeinflussen\". \r\n\r\nDie Unternehmer gehören diesmal zur breiten Masse, die dem Virus absolut hilflos gegenüber steht und auf keinen Fall Ansteckungen in ihrer Umgebung haben will, egal ob im Unternehmen oder privat. \r\n\r\nDas Wort \"beeinflussen\" ist in diesem Fall wohl auch nicht anwendbar. Ich würde eher sagen, dass die Regierung mit den Experten der verschiedenen Fachgebiete abwägt, was gerade noch zumutbar ist und was getan werden kann.",
        //                                "comment_date": "2020-04-11 13:01:32"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Op de Punkt. \r\nApropos Masken: de Mischi (CSV) däerf virun d'Kamera, den Emile (CSV), de Präsident vum Syvicol, och, de Gilles (CSV) vu  Mamer an de Marc (CSV) vun Hesper verdeele Masken ... eng pro Awunner! Dat ass fir emol an de Supermarché ze goën, duerno kënnen d'Awunner se direkt an d'Poubelle geheien. \r\nWat soll dat? Firwat de Leit mat esou enger Aktioun eppes vermëttelen, wat net stëmmt. D'Gefor, de Virus net ze kréien, ass mat esou Masken ëm 2 (!) Prozent méi kleng ewéi ouni Mask.",
        //                                "comment_date": "2020-04-11 12:02:55"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Den Unternehmer , Gehör schenken , ein Unterfangen dem jämmerlichen Gejammer ewig unzufriedner, dem Profit und Profiteurentum  anhängender Zeitgenossen, scheint sekundär sein. Mensch vor Profit,  Geldgier .Alleine die Meinung der Wissenschaft ,Mediziner zählt ,Menschenleben zu schützen.",
        //                                "comment_date": "2020-04-11 06:56:11"
        //                            },
        //                            {
        //                                "comment_author_name": "",
        //                                "comment_content": "Die Zurückhaltung der Schwarzen hat doch fast 14 Tage gehalten, ehe der Mann fürs Grobe wieder von der Kette gelassen wurde.",
        //                                "comment_date": "2020-04-11 01:05:45"
        //                            }
        //                        ]
        //                    },
        //                    "shares": []
        //                }
        //                ]
        //        }

//    const lapsList = result.packages.map((item) => {
//    let t1=(typeof item['object_relations'][0]['uri']!="undefined")?item['object_relations'][0]['uri']:null;
//    if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
//      {  var imageurlMedium = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_medium']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_medium'].url:null;}
//    if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
//    {  var imageurlSmall = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_small']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_small'].url:null;}
// const dataArray =
// { "title": item.title,
// "body":item.body.slice(44, 300),
// "pubDate":item.pubDate,
// "mainDestinationName":item.mainDestinationName,
// "comments":item.comments.count,
// "imageurlMedium":imageurlMedium,
// "imageurlSmall":imageurlSmall
// }
// ;
// return (
//  dataArray
// )
// });
// console.log(lapsList);


        return result;
    } catch (error) {
        throw error
    }
}

export async function getArticleLinks(id){

    try {
      let url='https://nux3.tageblatt.lu/dpijson/v1/article/'+id;
        let articles = await fetch(url,{
            headers:{  }
        });
        let result = await articles.json();

        return result;

    } catch (error) {
        throw error
    }
}

export async function getMenusideGategory(){

    try {
      let url='https://nux3.tageblatt.lu/dpijson/v1/menu';
        let articles = await fetch(url,{
            headers:{  }
        });
        let result = await articles.json();

        return result.main;

    } catch (error) {
        throw error
    }
}
