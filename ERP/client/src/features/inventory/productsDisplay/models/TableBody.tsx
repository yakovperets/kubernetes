import { TableBody } from "@mui/material";
import { StyledTableCell } from "../styles/styleLabelCell";
import { StyledTableRow } from "../styles/styleLabelRow";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setChosenProduct } from "../utils/inventorySlice";
import { setOpenPageProducts } from "../utils/inventorySlice";

const TableBodyModel = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts } = useAppSelector(
    (store) => store.inventory.inventoryProducts
  );

  return (
    <TableBody>
      {filteredProducts
        ?.map((product, key) => (
          <StyledTableRow
            key={key}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "#dbdbdb",
                transition: "background-color 0.2s",
              },
            }}
          >
            <StyledTableCell
              sx={{ padding: "0px", margin: "0px" }}
              onClick={() => {
                dispatch(setOpenPageProducts(true));
                dispatch(setChosenProduct(product));
              }}
              align="center"
            >
              <img
                width={"80px"}
                src={product.imageUrl}
                alt={product.imageAlt}
              />
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                dispatch(setOpenPageProducts(true));
                dispatch(setChosenProduct(product));
              }}
              align="center"
            >
              {product.category}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                dispatch(setOpenPageProducts(true));
                dispatch(setChosenProduct(product));
              }}
              align="center"
            >
              {product.name}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                dispatch(setOpenPageProducts(true));
                dispatch(setChosenProduct(product));
              }}
              align="center"
            >
              {product.quantity}
            </StyledTableCell>
          </StyledTableRow>
        ))
        .reverse()}
    </TableBody>
  );
};

export default TableBodyModel;
