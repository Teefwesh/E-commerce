import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createProducts } from "../../features/productsSlice";
import { PrimaryButton } from "./CommonStyled";

const CreateProduct = () => {
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState({
    name: "",
    brand: "",
    price: "",
    desc: "",
  });
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clear();
    dispatch(createProducts({ ...name, image: productImg }));
  };

  const clear = () => {
    setProductImg("");
    setName({
      name: "",
      brand: "",
      price: "",
      desc: "",
    });
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create a Product</h3>
        <input type="file" accept="image/" onChange={handleImageUpload} />
        <input
          type="text"
          required
          placeholder="Name"
          value={name.name}
          onChange={(e) => setName({ ...name, name: e.target.value })}
        />
        <select
          value={name.brand}
          onChange={(e) => setName({ ...name, brand: e.target.value })}
        >
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiomi</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          required
          placeholder="Price"
          value={name.price}
          onChange={(e) => setName({ ...name, price: e.target.value })}
        />
        <input
          type="text"
          required
          placeholder="Desc"
          value={name.desc}
          onChange={(e) => setName({ ...name, desc: e.target.value })}
        />

        <PrimaryButton type="submit">Submit</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <img src={productImg} alt="product-img" />
        ) : (
          <p>Image Preview</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
