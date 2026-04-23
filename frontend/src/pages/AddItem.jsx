import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import ItemForm from '../components/ItemForm';

const AddItem = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      await API.post('/items', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Report an Item</h1>
          <p className="text-slate-400">Fill in the details of the lost or found item</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          {error && (
            <div className="alert-error" id="add-item-error">
              {error}
            </div>
          )}
          <ItemForm
            onSubmit={handleSubmit}
            submitLabel="Report Item"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddItem;
