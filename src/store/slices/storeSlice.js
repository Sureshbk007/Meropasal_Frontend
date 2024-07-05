import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customization: {
    bannerImages: [],
    brandLogo: {},
    brandName: "MeroPasal",
    favicon: {},
  },
  categories: [],
  products: [
    {
      _id: "6672b25b8ac76e9cb9e5cbb5",
      title: "Men's T-Shirt",
      details: "Comfortable cotton t-shirt for men",
      variants: [
        {
          color: "Red",
          size: "S",
          price: 19.99,
          images: [
            {
              publicId: "12345",
              imageUrl: "https://example.com/tshirt_red_s.jpg",
              _id: "6672b25b8ac76e9cb9e5cbb7",
            },
            {
              publicId: "67890",
              imageUrl: "https://example.com/tshirt_red_s_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbb8",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbb6",
          createdAt: "2024-06-19T10:26:35.304Z",
          updatedAt: "2024-06-19T10:26:35.304Z",
          stock: 5,
        },
        {
          color: "Blue",
          size: "S",
          price: 21.99,
          images: [
            {
              publicId: "54321",
              imageUrl: "https://example.com/tshirt_blue_s.jpg",
              _id: "6672b25b8ac76e9cb9e5cbba",
            },
            {
              publicId: "09876",
              imageUrl: "https://example.com/tshirt_blue_s_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbbb",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbb9",
          createdAt: "2024-06-19T10:26:35.305Z",
          updatedAt: "2024-06-19T10:26:35.305Z",
          stock: 5,
        },
        {
          color: "Red",
          size: "M",
          price: 22.99,
          images: [
            {
              publicId: "13579",
              imageUrl: "https://example.com/tshirt_red_m.jpg",
              _id: "6672b25b8ac76e9cb9e5cbbd",
            },
            {
              publicId: "24680",
              imageUrl: "https://example.com/tshirt_red_m_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbbe",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbbc",
          createdAt: "2024-06-19T10:26:35.305Z",
          updatedAt: "2024-06-19T10:26:35.305Z",
          stock: 5,
        },
        {
          color: "Blue",
          size: "M",
          price: 24.99,
          images: [
            {
              publicId: "98765",
              imageUrl: "https://example.com/tshirt_blue_m.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc0",
            },
            {
              publicId: "43210",
              imageUrl: "https://example.com/tshirt_blue_m_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc1",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbbf",
          createdAt: "2024-06-19T10:26:35.305Z",
          updatedAt: "2024-06-19T10:26:35.305Z",
          stock: 5,
        },
        {
          color: "Red",
          size: "L",
          price: 25.99,
          images: [
            {
              publicId: "11223",
              imageUrl: "https://example.com/tshirt_red_l.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc3",
            },
            {
              publicId: "33445",
              imageUrl: "https://example.com/tshirt_red_l_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc4",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbc2",
          createdAt: "2024-06-19T10:26:35.306Z",
          updatedAt: "2024-06-19T10:26:35.306Z",
          stock: 5,
        },
        {
          color: "Blue",
          size: "L",
          price: 27.99,
          images: [
            {
              publicId: "55667",
              imageUrl: "https://example.com/tshirt_blue_l.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc6",
            },
            {
              publicId: "77889",
              imageUrl: "https://example.com/tshirt_blue_l_thumb.jpg",
              _id: "6672b25b8ac76e9cb9e5cbc7",
            },
          ],
          _id: "6672b25b8ac76e9cb9e5cbc5",
          createdAt: "2024-06-19T10:26:35.306Z",
          updatedAt: "2024-06-19T10:26:35.306Z",
          stock: 5,
        },
      ],
      ratings: [],
      createdAt: "2024-06-19T10:26:35.307Z",
      updatedAt: "2024-06-19T10:26:35.307Z",
      slug: "mens-t-shirt-1430",
    },
  ],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
});

export default storeSlice.reducer;
