import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item/Item";
import { connect } from "react-redux";
import {
  countDelete,
  countMinus,
  countPlus,
  itemEdit,
  localDownload,
  localUpload,
} from "../../store/actions/actions";
import axios from "../../axios/axios";

const ItemListBodyBlock = styled.tbody`
  tr:nth-child(even) {
    background-color: rgba(245, 245, 245, 0.9);
  }
  tr:hover {
    background-color: rgba(240, 240, 240, 0.9);
  }
`;
const ItemListBody = ({
  list,
  onPlus,
  onMinus,
  onDelete,
  upload,
  download,
  onEdit,
  stateForJson,
}) => {
  const [downloadedData, setDownloadedData] = useState(false);

  useEffect(() => {
    // For jsonServer
    axios.get("data").then(({ data: { list } }) => {
      console.log("downloaded: ", list);
      setDownloadedData(true);
      download(list);
    });

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (downloadedData) {
      console.log("list: ", stateForJson);
      axios.put("/data", { list: stateForJson }).then(({ data: { list } }) => {
        console.log("axios update: ", list);
        upload();
      });
    }
  }, [stateForJson, downloadedData, upload]);

  const items = list.map((item) => {
    const { id, ...otherParam } = item;
    return (
      <Item
        key={id}
        onDelete={() => onDelete(id)}
        onPlus={() => onPlus(id)}
        onMinus={() => onMinus(id)}
        onEdit={(word, meaning) => onEdit(id, word, meaning)}
        {...otherParam}
      />
    );
  });

  return <ItemListBodyBlock>{items}</ItemListBodyBlock>;
};

function mapDispatchToProps(dispatch) {
  return {
    onPlus: (itemId) => dispatch(countPlus(itemId)),
    onMinus: (itemId) => dispatch(countMinus(itemId)),
    onDelete: (itemId) => dispatch(countDelete(itemId)),
    onEdit: (id, word, meaning) => dispatch(itemEdit(id, word, meaning)),
    upload: () => dispatch(localUpload()),
    download: (data) => dispatch(localDownload(data)),
  };
}

export default connect(null, mapDispatchToProps)(ItemListBody);
