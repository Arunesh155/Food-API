const key = "47c949bf2d736ea85ba024b54b609c56"
const ID = "76cf395a"

export async function fetchRecipes (filter){
    const {query, limit} = filter;

    const url = `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${key}&from=0&to=${limit}&`;

    const response = await fetch(url)
    const data = await response.json();
    console.log(data)
    return data?.hits;
}

export async function fetchRecipe(id){
const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${ID}&app_key=${key}`

const response = await fetch(url)

const data = await response.json();

return data[0];
}
