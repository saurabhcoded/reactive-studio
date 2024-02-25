import ReactDOM from "react-dom/client";
import Provider from "./Provider";
import Container from "./Container";
import "./styles/styles.css";
import DesignEditor from "./DesignEditor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      <DesignEditor />
    </Container>
  </Provider>
);
