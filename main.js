const url = "https://raw.githubusercontent.com/mkatay/json_products/refs/heads/main/products"

let products = []
let categories = []

getData(url, renderData)

function renderData (data) {
    categories = getUniqueValues(data, 'category')
    products = data
    console.log(categories);
    renderCheckboxes(categories)
    getHigherRatingProducts()
}

function renderCheckboxes(arr) {
    document.querySelector('button').disabled=false
    document.querySelector('button').classList.remove('cursor-not-allowed')
    document.querySelector('ul').innerHTML= ''
    arr.forEach(item => document.querySelector('ul').innerHTML += `
        <li class="border border-gray-300 rounded">
            <div class="flex items-center ps-3">
                <input id=${item} type="checkbox" value=${item} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                <label for=${item} class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${item}</label>
            </div>
        </li>    
    `)
}

function showResults() {
    console.log('klikk');
    const checkedValues=[]
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(domObj=>
        checkedValues.push(domObj.value)
    )
    console.log(checkedValues);
    const filteredProducts=products.filter(obj=>checkedValues.includes(obj['category']))
    console.log(filteredProducts);
    //cards:
    document.querySelector('.cards').innerHTML=''
    filteredProducts.forEach(obj=>
    document.querySelector('.cards').innerHTML+=`  
<a onclick="reszletek(this)" data-modal-target="default-modal" data-modal-toggle="default-modal" id=${obj.id} class="flex flex-col justify-between flex-wrap max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${obj.title}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400"><b>Price:</b> ${obj.price} $</p>
    <p class="font-normal text-gray-700 dark:text-gray-400"><b>Category:</b> ${obj.category}</p>
    <img src="https://picsum.photos/id/${obj.id}/300" alt="">
</a>
        `
    )
}

function getHigherRatingProducts() {
    products.sort((a, b) => b.rating - a.rating)
    elsoot = products.slice(0,5)
    console.log(elsoot)
    elsoot.forEach (obj => 
        document.querySelector('.cards').innerHTML+=`  
        <a onclick="reszletek(this)" data-modal-target="default-modal" data-modal-toggle="default-modal" id=${obj.id} class="flex flex-col justify-between flex-wrap max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${obj.title}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400"><b>Price:</b> ${obj.price} $</p>
            <p class="font-normal text-gray-700 dark:text-gray-400"><b>Category:</b> ${obj.category}</p>
            <img src="https://picsum.photos/id/${obj.id}/300" alt="">
        </a>
                `
    )
}

function reszletek(kap) {
    products.forEach(item => {
        if (item.id == kap.id) {
            reszletlista = item
        }
    })
    document.querySelector('.focim').innerHTML=reszletlista.title
    document.querySelector('.egy').innerHTML=`<b>Price:</b> ${reszletlista.price} $`
    document.querySelector('.ketto').innerHTML=`<b>Category:</b> ${reszletlista.title}`
    document.querySelector('.harom').innerHTML=`<img src="https://picsum.photos/id/${reszletlista.id}/500" alt="">`
    document.querySelector('.negy').innerHTML=`<b>Description:</b> ${reszletlista.description}`
    document.querySelector('.ot').innerHTML=`<b>Description:</b> ${reszletlista.description}`
    document.querySelector('.hat').innerHTML=`<b>Discount:</b> ${reszletlista.discount} %`
    document.querySelector('.het').innerHTML=`<b>Rating:</b> ${reszletlista.rating}`
    document.querySelector('.nyolc').innerHTML=`<b>Stock:</b> ${reszletlista.stock}`
    document.querySelector('.kilenc').innerHTML=`<b>Brand:</b> ${reszletlista.brand}`
}