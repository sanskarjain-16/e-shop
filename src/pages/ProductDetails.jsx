
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p className="text-gray-600">Viewing product ID: {id}</p>
    </div>
  );
}

export default ProductDetails;