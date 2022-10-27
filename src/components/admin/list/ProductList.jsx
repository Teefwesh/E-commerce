import * as React from "react";
import styled from "styled-components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProducts } from "../../../features/productsSlice";
import EditProduct from "../EditProduct";

export default function ProductList() {
  const { items } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.desc,
        price: item.price.toLocaleString(),
      };
    });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/product/${params.row.id}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
    console.log("deleting");
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.div`
  background-color: rgb(255, 77, 72);
  padding: 3px 5px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`;

const View = styled.div`
  background-color: rgb(114, 225, 40);
  padding: 3px 5px;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`;
