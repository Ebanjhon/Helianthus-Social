// ImageFilter.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-gl';
import { Shaders, Node, GLSL } from 'gl-react';

// Định nghĩa shader với điều chỉnh độ sáng
const shaders = Shaders.create({
    brightnessFilter: {
        frag: GLSL`
        precision highp float;
        uniform sampler2D texture;
        uniform float brightness;
        varying vec2 uv;
        void main() {
          vec4 color = texture2D(texture, uv);
          color.rgb += brightness; // Điều chỉnh độ sáng
          gl_FragColor = color;
        }
      `,
    },
});

const ImageFilter = ({ image, brightness }) => (
    <View style={styles.container}>
        <Surface style={styles.surface}>
            <Node
                shader={shaders.brightnessFilter}
                uniforms={{
                    texture: { uri: image },
                    brightness: brightness, // Truyền giá trị độ sáng vào shader
                }}
            />
        </Surface>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    surface: {
        width: 300, // Chỉ định kích thước cho Surface
        height: 300,
    },
});

export default ImageFilter;
