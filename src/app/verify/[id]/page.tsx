import Verify from "components/Auth/verify";

const VerifyPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <div>
            <Verify
                id={id}
            />
        </div>
    )
}

export default VerifyPage;