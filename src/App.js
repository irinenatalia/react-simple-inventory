import React, { useEffect, useState } from "react";
import './App.css';
import IconBack from './assets/img/icon-arrow-left.svg'
import IconBox from './assets/img/icon-box.svg'
import IconEdit from './assets/img/icon-pencil.svg'
import IconAdd from './assets/img/icon-plus.svg'
import IconSearch from './assets/img/icon-search.svg'
import IconUpload from './assets/img/icon-upload.svg'
import Modal from './components/AddProductModal.js';

function App() {
  const [category, setCategory] = useState([
    {id: 0, name: 'Cocktail'},
    {id: 1, name: 'Shooters'},
    {id: 2, name: 'Premium Spirits'},
    {id: 3, name: 'Non-Alcoholic Beverages'}
  ]);
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [formData,setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let showModal = () => {
    setIsModalVisible(true);
  }
  
  let hideModal = () => {
    setIsModalVisible(false);
  }

  let handleFormData = (modalFormData) => {
    setFormData(modalFormData);
  }

  const handleFilter = (e) => {
    const value = e.target.value;
    const filtered = products.filter(product => product.productName.includes(value));
    setFilteredProducts([...filtered]);
  };

  function filterByCategory(id){
    const filtered = products.filter(product => product.category == id);
    setFilteredProducts([...filtered]);
    document.getElementById("cat-"+id).classList.toggle("selected");
  }

  useEffect(() => {
    if(formData.length > 0){
      let parsedFormData = JSON.parse(formData)
      setProducts([
        ...products,
        { productName: parsedFormData.productName,
          menuCode: parsedFormData.menuCode,
          category: parsedFormData.category,
          aboutProduct: parsedFormData.aboutProduct,
          price: parsedFormData.price,
          discountPrice: parsedFormData.discountPrice,
          image: parsedFormData.image
        }
      ]);
    }
  }, [formData]);

  useEffect(() => {
    if(products.length > 0){
      console.log(products);
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <div className="App">
      <header className='flex'>
        <div className='header-back flex'>
          <img src={IconBack} /><span>{' '}Back</span>
        </div>
        <div className='header-center flex'>
          <img src={IconBox} /> Product list
        </div>
        <div className='header-invis'></div>
      </header>

      <div className='body'>
        <section className='top-action flex'>
          <div className='search'>
            <input type='text' placeholder='Search Product' onChange={handleFilter} />
            <img src={IconSearch} />
          </div>
          <div className='import border-rounded-1'>
            <img src={IconUpload} /><span>{' '}Import</span>
          </div>
        </section>

        <section className='category-wrapper'>
          <div className='category-wrapper-div flex'>
            Category
            <ul>
              {category.map(cat => (
                <li key={cat.id} onClick={() => filterByCategory(cat.id)} id={'cat-'+cat.id}>
                  {cat.name}
                </li>
              ))}
            </ul>
            <img src={IconEdit} className="category-edit" />
          </div>
        </section>

        <section className="product-wrapper flex">
          {filteredProducts.map(p => (
              <div key={p.menuCode} className="product-item">
                <div>
                  <span className={p.discountPrice>0? 'strikethrough' : ''}>{parseInt(p.price).toLocaleString()} NT&nbsp;</span>
                  <span className="p-discount">{p.discountPrice>0? parseInt(p.discountPrice).toLocaleString() + ' NT' : ''}</span>
                </div>
                <div className="p-image-wrapper"><img src={p.image} /></div>
                <div className="p-name">{p.productName}</div>
                <div className="p-desc">{p.aboutProduct}</div>
              </div>
          ))}
          <div className="add-product" onClick={showModal}>
              <img src={IconAdd} />
              Add New Product
          </div>
        </section>
      </div>

      <footer className="flex">
        <div className="passed">Nightclub Profile</div>
        <div className="passed">Featured</div>
        <div className="passed">Beverages</div>
        <div>Table Information</div>
        <div>Operational Hour</div>
        <div className="next">NEXT</div>
      </footer>

      <Modal show={isModalVisible} handleClose={hideModal} category={category} handleFormData={handleFormData}></Modal>
    </div>
  );
}

export default App;
