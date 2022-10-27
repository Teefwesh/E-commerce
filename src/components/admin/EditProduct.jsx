import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "./CommonStyled";
import { editProduct } from "../../features/productsSlice";

export default function EditProduct({ prodId }) {
  const [open, setOpen] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [postData, setPostData] = useState({
    name: "",
    brand: "",
    price: "",
    desc: "",
  });

  const { items, editStatus } = useSelector((state) => state.products);
  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState();

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImg("");
    setPostData({
      name: selectedProd.name,
      brand: selectedProd.brand,
      price: selectedProd.price,
      desc: selectedProd.desc,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clear();
    dispatch(
      editProduct({
        productImg,
        product: {
          ...currentProd,
          ...postData,
        },
      })
    );
  };

  const clear = () => {
    setProductImg("");
    setPostData({
      name: "",
      brand: "",
      price: "",
      desc: "",
    });
  };

  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <StyledEditProduct>
          <StyledForm onSubmit={handleSubmit}>
            <h3>Create a Product</h3>
            <input type="file" accept="image/" onChange={handleImageUpload} />

            <input
              type="text"
              required
              placeholder="Name"
              value={postData.name}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
            <select
              value={postData.brand}
              onChange={(e) =>
                setPostData({ ...postData, brand: e.target.value })
              }
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
              value={postData.price}
              onChange={(e) =>
                setPostData({ ...postData, price: e.target.value })
              }
            />
            <input
              type="text"
              required
              placeholder="Desc"
              value={postData.desc}
              onChange={(e) =>
                setPostData({ ...postData, desc: e.target.value })
              }
            />

            <PrimaryButton type="submit">
              {editStatus === "pending" ? "Submitting" : "Submit"}
            </PrimaryButton>
          </StyledForm>
          <ImagePreview>
            {previewImg ? (
              <img src={previewImg} alt="product-img" />
            ) : (
              <p>Image Preview</p>
            )}
          </ImagePreview>
        </StyledEditProduct>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 5px 5px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

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

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
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
