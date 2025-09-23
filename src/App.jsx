import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {useEffect, useState} from "react";
import {OrbitControls} from "@react-three/drei";

function App() {

    const [changes, setChanges] = useState(0);

    useEffect(() => {
        console.log("Change Count:", changes);
    }, [changes]);

    return (
        <Canvas shadows orthographic camera={{ zoom: 50, position: [2,5,-10], near: 0.1, far: 10000 }}>
            <color attach="background" args={["#efeded"]} />
            <ambientLight intensity={1} />

            <OrbitControls enableZoom={true}  />

            <Experience setChanges={setChanges} />
        </Canvas>
    );
}

export default App;


// [2,5,-10]
// [0,-1,10]
// <gridHelper args={[100, 100]} />
// <axesHelper args={[50]} />