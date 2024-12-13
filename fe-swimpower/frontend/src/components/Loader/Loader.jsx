import { PropagateLoader } from "react-spinners"
import { Row,Col} from "react-bootstrap"

const Loader = () => {
    return (
        <Row
        
        >
            <Col>
            <PropagateLoader
            color="#F96E2A"
            loading
            size={15}
            speedMultiplier={1}
        />
            </Col>
        </Row>
        
    )
}

export default Loader