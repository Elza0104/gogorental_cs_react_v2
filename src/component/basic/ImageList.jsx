import { Box, Pagination, Button, Checkbox, 
  FormControl, InputLabel, Select, MenuItem, 
  Typography, Dialog, IconButton, ImageList, ImageListItem } from "@mui/material";
  import { useEffect, useState } from "react";

const Imagelist = (showImages) => {
  const [showImage, setShowImages] = useState([]);
  console.log(showImages.setShowImages);

  const reader = new FileReader();
  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target;
    let imageUrlLists = [...showImages.showImages];
    
     const img = new FormData();
      console.log(showImage);


    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      reader.readAsText(imageLists)
      img.append(i, currentImageUrl)
      //imageUrlLists.push(ww);
      console.log(currentImageUrl)
      console.log(typeof(currentImageUrl))
      console.log(img)
      console.log(reader);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    showImages.setShowImages(img);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    showImages.setShowImages(showImages.showImages.filter((_, index) => index !== id));
  };
  
  return(
    <div>
      <label htmlFor="input-file" onChange={handleAddImages}>
        <input type="file" id="input-file" multiple/>
        <p>사진추가</p>
      </label>
        <ImageList sx={{ width: 500, height: 450 }} >
      
      </ImageList>
    </div>
  )
}
export default Imagelist;