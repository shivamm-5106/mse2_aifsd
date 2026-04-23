import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import ItemForm from '../components/ItemForm';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        setError('Item not found');
      } finally {
        setFetching(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      await API.put(`/items/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Item</h1>
          <p className="text-slate-400">Update the details of your item</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          {error && (
            <div className="alert-error" id="edit-item-error">
              {error}
            </div>
          )}
          {item && (
            <ItemForm
              initialData={item}
              onSubmit={handleSubmit}
              submitLabel="Update Item"
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditItem;
