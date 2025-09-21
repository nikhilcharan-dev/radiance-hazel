import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {useState} from "react";

function App() {

    const [changes, setChanges] = useState(0);



    return (
        <Canvas shadows orthographic camera={{ zoom: 50, position: [2,5,-10], near: 0.1, far: 1000 }}>
            <color attach="background" args={["#efeded"]} />
            <gridHelper args={[100, 100]} />
            <axesHelper args={[50]} />
            <Experience />
        </Canvas>
    );
}

export default App;


//[2,5,-10]
//[0,-1,10]