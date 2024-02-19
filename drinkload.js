$(document).ready(function() {

    const spiritsArray = DB2.spirits;
    
    const title = "Cognac";
    const $titleElement = $("<h1>").text(title);
    $("#title-container").append($titleElement);
    
        const matchingSpirits = spiritsArray.filter(spirit => spirit.varugrupp === title);
        
        if (matchingSpirits.length > 0) {
            // Loop through the matching spirits
            matchingSpirits.forEach(spirit => {
                
                const $nameElement = $("<div>", { class: "spirit" });
                $nameElement.append( $("<p id = spirit>").text(spirit.namn));
                
                $("#drink-name").append($nameElement);
            });
    }
});
    
    
            
                
    
            
           
                  
           