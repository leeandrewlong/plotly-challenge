function cleanchart(id){
    d3.json("samples.json").then(function(data){
        console.log(data)
        let samples = data.samples
        let mySamples = samples.filter(sample => sample.id == id)
        console.log("------------------------------")
        console.log(mySamples)
        let ids = mySamples[0].otu_ids;
        console.log(ids);
        let belly_sample = mySamples[0].sample_values;
        let values= mySamples[0].sample_values.slice(0,10).reverse();
        console.log(values);
        let belly_labels=mySamples[0].otu_labels;
        let labels = mySamples[0].otu_labels.slice(0,10);
        console.log(labels);
        let topOTU = ( mySamples[0].otu_ids.slice(0, 10)).reverse();
        console.log(topOTU);
        // get the otu id's to the desired form for the plot
        let OTU_id = topOTU.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`);
        // get the top 10 labels for the plot
        console.log(`OTU_labels:${labels}`);
        // create layout variable to set plots layout
        var grab = {
            x:values,
            y:OTU_id,
            text: labels,
            marker:{
            color:'purple'},
            type:'bar',
            orientation:'h',
        };
        let dataPlot = [grab];
        
        var layout = {
            title:'Top 10 OTUs ',
            yaxis:{
                tickmode:'linear'
            },
            margin:{
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
        Plotly.newPlot('bar', dataPlot, layout);
        // set the layout for the bubble plot
        var grabber={
            x:ids,
            y:belly_sample,
            mode:'markers',
            marker: {
                size:belly_sample,
                color:ids,
            },
            text: belly_labels
        };
        var design = {
            xaxis:{title:'OTU ID'},
            height:600,
            width:1000
        };
        let dataPlot1=[grabber];
        Plotly.newPlot('bubble', dataPlot1, design)
    });
}
    
//create the function to get the necessary data
function getDemographicData(id){
    d3.json("samples.json").then((data)=> {
        let metadata =data.metadata;

    // filter meta data info by id
    let result = metadata.filter(meta=>meta.id.toString()===id)[0];
    // select demographic panel to put mySamples[0]
    let demoInfo=d3.select('#sample-metadata');
    demoInfo.html("");
    //get the necessary demographic data for id and append info to panel
    Object.entries(result).forEach(([key,value]) => {
        demoInfo.append('h5').text(`${key}: ${value}`);
        });
    });
}

// function optionChanged(id){
//     cleanchart(id)
//     getDemographicData(id)
// }
    // create the function for the initial data rendering
function init(){
    let dropdown=d3.select('#selDataset');
    d3.json('samples.json').then((data)=>{
    data.names.forEach(function(name){
        dropdown.append("option").text(name).property('value')
    });

    //updatePlotly(data);
    cleanchart(data.names[0]);
    getDemographicData(data.names[0]);
    });
}

init();


//get dropdown menu 
let dropdown=d3.select('#selDataset');
// dropdown event listener
dropdown.on('click',()=>{
    let id= dropdown.property('value')
    console.log(id)
    cleanchart(id)
    getDemographicData(id)
})