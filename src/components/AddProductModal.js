import '../assets/css/modal.css';
import IconClose from '../assets/img/icon-close.svg'
import IconUpload from '../assets/img/icon-img-upload.svg'
import IconSwitch from '../assets/img/icon-switch.svg'
import { Formik, Form, Field } from "formik"

const Modal = ({ handleClose, show, category, handleFormData }) => {
    const showHideClassName = show ? "modal" : "modal hidden";
    // Messages
    const required = "This field is required";
    const maxLength = "Your input exceed maximum length";

    // Error Component
    const errorMessage = error => {
    return <div className="invalid-feedback">{error}</div>;
    };

  return (
    <div className={showHideClassName}>
        <div className='tooltip'>
            <div className='bold'>Looking for variant ?</div>
            <p>Don’t worry!!<br></br><br></br>size, sugar level, ice level will be unlocked if you already approved by admin.</p>
        </div>
      <section className="modal-main">
        <button className="modal-close" onClick={handleClose}>
          <img src={IconClose} />
        </button>
        <Formik
            initialValues={{
                productName: "",
                menuCode: "",
                category: "",
                aboutProduct: "",
                price: "",
                discountPrice: ""
            }}
            onSubmit={(values, { resetForm }) => {
                handleFormData(JSON.stringify(values, null, 2))
                resetForm()
                handleClose()
            }}
        >
        {({ errors, touched, setFieldValue, values, handleChange, handleBlur }) => (
            <Form className='modal-form'>
                <div className='title'>Add item</div>
                <div className='flex form-groups'>
                    <div className='row'>
                        <div className="form-group col">
                            <label>Your product name</label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Product name"
                                name="productName"
                                required />
                            {errors.productName &&
                            touched.productName &&
                            errorMessage(errors.productName)}
                        </div>
                        <div className="form-group col">
                            <label>Menu code</label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Menu code"
                                name="menuCode"
                                required />
                            {errors.menuCode &&
                            touched.menuCode &&
                            errorMessage(errors.menuCode)}
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col">
                            <label>Category</label>
                            <select name="category" 
                                value={values.category} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                required>
                                <option value="">Select category</option>
                                {category.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col">
                            <label>Tell me more about your product <span className='required'>*</span></label>
                            <Field
                                component="textarea"
                                className="form-control"
                                name="aboutProduct"
                                placeholder="Product description"
                                rows="5"
                                required />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col">
                            <label>Price <span className='required'>*</span></label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Price"
                                name="price"
                                required />
                            {errors.price &&
                            touched.price &&
                            errorMessage(errors.price)}
                        </div>
                        <div className="form-group col">
                            <label>Discount price (optional)</label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Discounted price"
                                name="discountPrice" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form-group col">
                            <label>Image <span className='required'>*</span></label>
                            <label htmlFor="file" className='custom-file-upload'>
                                <span>
                                    {values.image? (<img src={values.image} className='uploaded-file'/>) : 'Select File'}
                                </span>
                                <img src={IconUpload} />
                            </label>
                            <input id="file" name="file" type="file" accept="image/*" onChange={event => setFieldValue("image", URL.createObjectURL(event.currentTarget.files[0]))}/>
                        </div>
                    </div>

                    <div className='row m-row'>
                        <div className='col'>Enable Variant</div>
                        <div className='col dummy-variant'><img src={IconSwitch} /></div>
                    </div>

                    <div className='row'>
                        <div className="form-group">
                            <button className="form-submit" type="submit">
                                Add product
                            </button>
                        </div>
                    </div>
                    
                </div>
            </Form>
        )}
        </Formik>
      </section>
    </div>
  );
};

export default Modal;