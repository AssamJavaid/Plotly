function getPlots(id) {
//Read samples.json
    d3.json("samples.json").then (sampledata =>{
        var ids = sampledata.samples[0].otu_ids;
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);


    // get only top 10 otu ids for the plot 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
  
     // get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };

        // data variable
        var data = [trace];

        // layout variable 
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // bar plot
    Plotly.newPlot("bar", data, layout);
        // bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace1];

    // create the bubble plot
    Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}  

function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;


      // filter meta data info by id and select demographic panel
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
       var demographicInfo = d3.select("#sample-metadata");
        
     // empty panel 
       demographicInfo.html("");

     // grab data and append
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();