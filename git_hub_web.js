const path = require("path");
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const link="https://github.com/topics";
request(link,cd);
function cd(error,response,html)
{
    if(error){
        console.log(error);
    }
    else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allScorecardTags = document.querySelectorAll('.no-underline.d-flex.flex-column.flex-justify-center');
        for(let i=0;i<allScorecardTags.length;i++){
            let link = allScorecardTags[i].href;
            let completeLink = "https://github.com"+link;
            request(completeLink,detel);
        }
    }
}
function detel(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let head_detail=document.querySelector(".col-sm-10.d-flex.flex-items-center.mb-3.mb-sm-0 .h1");
        let  dead_detail_data =head_detail.textContent.trim()
        let prog_detail = document.querySelector(".markdown-body.f5.mb-2 p");
        let prog_detail_data = prog_detail.textContent
        const paths=__dirname;
        const folderName = `f1/${dead_detail_data}`;
        let pathoffolder=path.join(paths,folderName);
        try {
                if (!fs.existsSync(pathoffolder)) 
                {
                    let path_of_file=fs.mkdirSync(pathoffolder,{recursive:true});
                    
                }
            } 
            catch (err) 
            {
                console.error(err);
            }
            let f_name=`${dead_detail_data}.txt`;
        fs.writeFileSync(f_name,prog_detail_data,function(err)
        {
            if (err){
                
                console.log('Saved!');
            }else{
                console.log('work is done')
            }
        })
        let a=__dirname;
        let scon=path.join(a,f_name);
         let dis=path.join(pathoffolder,f_name);
         fs.copyFileSync(scon,dis);
         fs.unlinkSync(scon);
    }
}