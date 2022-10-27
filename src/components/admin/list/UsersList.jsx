import { useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { deleteProducts } from "../../../features/productsSlice";
import { deleteUser, fetchUsers } from "../../../features/userSlice";

export default function UsersList() {
  const { list } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        uName: user.name,
        uEmail: user.email,
        isAdmin: user.isAdmin,
      };
    });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "uName",
      headerName: "Name",
      width: 150,
    },
    { field: "uEmail", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>

            <View onClick={() => navigate(`/user/${params.row.id}`)}>View</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
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

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.div`
  background-color: rgb(255, 77, 73);
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

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
