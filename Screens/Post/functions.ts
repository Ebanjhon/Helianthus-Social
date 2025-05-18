// import { useState } from "react";

// // Ma trận độ sáng
// const [brightness, setBrightness] = useState(0); // Độ sáng (mặc định là 0)
// const [saturation, setSaturation] = useState(1); // Độ bão hòa (mặc định là 1)
// const [contrast, setContrast] = useState(1); // Độ tương phản (mặc định là 1)
// const contrastFactor = (contrast + 1) / 2;
// // Ma trận độ sáng (với độ sáng 0, ma trận sẽ không thay đổi màu sắc)
// const brightnessMatrix = [
//     contrastFactor, 0, 0, 0, brightness, // Cột cho kênh đỏ
//     0, contrastFactor, 0, 0, brightness, // Cột cho kênh xanh lá
//     0, 0, contrastFactor, 0, brightness, // Cột cho kênh xanh dương
//     0, 0, 0, 1, 0  // Cột cho alpha (độ trong suốt)
// ];

// // Ma trận độ bão hòa (với độ bão hòa 1, màu sắc sẽ không thay đổi)
// // Ma trận độ bão hòa (mặc định không thay đổi)
// const saturationMatrix = [
//     (1 - saturation) * 0.2126 + saturation, (1 - saturation) * 0.2126, (1 - saturation) * 0.2126, 0, 0, // Kênh đỏ
//     (1 - saturation) * 0.7152, (1 - saturation) * 0.7152 + saturation, (1 - saturation) * 0.7152, 0, 0, // Kênh xanh lá
//     (1 - saturation) * 0.0722, (1 - saturation) * 0.0722, (1 - saturation) * 0.0722 + saturation, 0, 0, // Kênh xanh dương
//     0, 0, 0, 1, 0  // Alpha (độ trong suốt)
// ];

// // Kết hợp hai ma trận độ sáng và độ bão hòa
// const combinedMatrix = [
//     brightnessMatrix[0] * saturationMatrix[0] + brightnessMatrix[1] * saturationMatrix[5] + brightnessMatrix[2] * saturationMatrix[10], // Kênh đỏ
//     brightnessMatrix[0] * saturationMatrix[1] + brightnessMatrix[1] * saturationMatrix[6] + brightnessMatrix[2] * saturationMatrix[11],
//     brightnessMatrix[0] * saturationMatrix[2] + brightnessMatrix[1] * saturationMatrix[7] + brightnessMatrix[2] * saturationMatrix[12],
//     0,
//     brightnessMatrix[0] * saturationMatrix[4] + brightnessMatrix[1] * saturationMatrix[9] + brightnessMatrix[2] * saturationMatrix[14] + brightnessMatrix[4], // Độ sáng kênh đỏ

//     brightnessMatrix[5] * saturationMatrix[0] + brightnessMatrix[6] * saturationMatrix[5] + brightnessMatrix[7] * saturationMatrix[10], // Kênh xanh lá
//     brightnessMatrix[5] * saturationMatrix[1] + brightnessMatrix[6] * saturationMatrix[6] + brightnessMatrix[7] * saturationMatrix[11],
//     brightnessMatrix[5] * saturationMatrix[2] + brightnessMatrix[6] * saturationMatrix[7] + brightnessMatrix[7] * saturationMatrix[12],
//     0,
//     brightnessMatrix[5] * saturationMatrix[4] + brightnessMatrix[6] * saturationMatrix[9] + brightnessMatrix[7] * saturationMatrix[14] + brightnessMatrix[9], // Độ sáng kênh xanh lá

//     brightnessMatrix[10] * saturationMatrix[0] + brightnessMatrix[11] * saturationMatrix[5] + brightnessMatrix[12] * saturationMatrix[10], // Kênh xanh dương
//     brightnessMatrix[10] * saturationMatrix[1] + brightnessMatrix[11] * saturationMatrix[6] + brightnessMatrix[12] * saturationMatrix[11],
//     brightnessMatrix[10] * saturationMatrix[2] + brightnessMatrix[11] * saturationMatrix[7] + brightnessMatrix[12] * saturationMatrix[12],
//     0,
//     brightnessMatrix[10] * saturationMatrix[4] + brightnessMatrix[11] * saturationMatrix[9] + brightnessMatrix[12] * saturationMatrix[14] + brightnessMatrix[14], // Độ sáng kênh xanh dương

//     0, 0, 0, 1, 0  // Alpha
// ];