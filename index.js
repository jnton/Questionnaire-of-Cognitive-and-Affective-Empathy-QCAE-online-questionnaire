function createSurveyPdfModel(surveyModel) {
    let pdfWidth = !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
    let pdfHeight = !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
    let options = {
        fontSize: 14,
        margins: {
            left: 10,
            right: 10,
            top: 10,
            bot: 10
        },
        
        
        format: [pdfWidth, pdfHeight]
    };
    const surveyPDF = new SurveyPDF.SurveyPDF(json, options);
    if (surveyModel) {
        surveyPDF.data = surveyModel.data;
    }
    
    return surveyPDF;
}
function saveSurveyToPdf(filename, surveyModel) {
    createSurveyPdfModel(surveyModel).save(filename);
}
const survey = new Survey.Model(json);
// You can delete the line below if you do not use a customized theme
survey.applyTheme(themeJson);
survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
});
function saveSurveyToFile() {
    saveSurveyToPdf("surveyResult.pdf", survey);
}
function savePdfViaBlob() {
    const surveyPDF = createSurveyPdfModel(survey);
    surveyPDF.raw("bloburl").then(function(bloburl) {
        const a = document.createElement("a");
        a.href = bloburl;
        a.download = "surveyViaBlob.pdf";
        document.body.appendChild(a);
        a.click();
    });
}
survey.navigationBar.getActionById("sv-nav-complete").visible = false;
survey.addNavigationItem({
    id: "survey_save_as_file", title: "Save as PDF", action: saveSurveyToFile
});
survey.addNavigationItem({
    id: "survey_save_via_blob", title: "Save via Blob", action: savePdfViaBlob
});

$("#surveyElement").Survey({ model: survey });
$("#btnSavePdf").click(function () {
    saveSurveyToPdf("surveyResult.pdf", survey);
});
