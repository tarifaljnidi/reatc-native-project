
import { _api_key, language, category, articles_url, getimages_url} from '../config/rest_config';

//function get articles of home screen
export async function getArticles(url){

    try {
        let articles = await fetch(url,{headers:{}});
    let result = await articles.json();
    //check fileds
   const lapsList = result.packages.map((item) => {
   let t1=(typeof item['object_relations'][0]['uri']!="undefined")?item['object_relations'][0]['uri']:null;
   if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
     {  var imageurlMedium = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_medium']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_medium'].url:null;}
   if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
   {  var imageurlSmall = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_small']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_small'].url:null;}
   let urlshare=(typeof item['object_relations'][1]!="undefined")?item['object_relations'][1].uri:null;

 const response=item.body;
 const matches = [];
 response.replace(/<p>(.*?)<\/p>/g, function () {
     matches.push(arguments[1]);
 });

 // get first paragraph
 const firstParagraphWithoutHtml = (matches[0]!="") ?  matches[0] : matches[1];

//extract data and put in array
const dataArray =
{ "nid":item.nid,
  "title": item.title,
"body":item.body,
"pubDate":item.pubDate,
"mainDestinationName":item.mainDestinationName,
"comments":item.comments.count,
"imageurlMedium":imageurlMedium,
"imageurlSmall":imageurlSmall,
"urlshare":urlshare,
"freeaccess": item.freeaccess,
"foretitle": item.foretitle,
"object_relations":item.object_relations,
 "object_definitions":item.object_definitions,
 "commentscount":item.comments.count,
 "pubDate":item.pubDate,
 "body":firstParagraphWithoutHtml
}
;
return (
 dataArray
)
});
        return lapsList;
    } catch (error) {
        throw error
    }
}
//function get single article details
export async function getArticleLinks(id){

    try {
      let url='http://awstgb2.tageblatt.lu/dpijson/v1/article/'+id;
        let articles = await fetch(url,{
            headers:{  }
        });
        let result = await articles.json();

        return result;

    } catch (error) {
        throw error
    }
}
//function get categories of home screen side menu
export async function getMenusideGategory(){

    try {
      let url='http://awstgb2.tageblatt.lu/dpijson/v1/menu';
        let articles = await fetch(url,{
            headers:{  }
        });
        let result = await articles.json();

        return result.main;

    } catch (error) {
        throw error
    }
}
