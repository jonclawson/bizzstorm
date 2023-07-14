import { Badge, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeletePlanMutation } from "../slices/planApiSlice";
import { toast } from "react-toastify";


const PlanList = ({props}) => {
    const plans = props?.data?.plans;

    const [deletePlan] = useDeletePlanMutation();

    const onDeleteHandler =  async (id) => {
        try {
            await deletePlan(id);
            props.refetch()
            toast.success('Plan deleted')
        }
        catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div>
            <h2>Plans</h2>
            <ListGroup>
                {
                    plans?.map(p => (
                        <ListGroup.Item key={p._id}>
                            <Link to={`/plan/${p._id}`}  > {p.name}  </Link>
                            <Badge bg="warning" className="float-end btn btn-sm text-white" onClick={() => onDeleteHandler(p._id)}>x</Badge>
                            <p>{p.description}</p>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
}

export default PlanList;
