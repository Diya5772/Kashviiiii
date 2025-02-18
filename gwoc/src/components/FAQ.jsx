import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/faq/all");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <p className="text-center">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-2">
        <h2 className="text-4xl font-serif text-[#2D2B29]">FAQ</h2>
        <p className="text-lg uppercase tracking-wide text-[#2D2B29]">WHAT IS..</p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={faq._id} 
            className="border-b border-[#E5E5E5] last:border-b-0"
          >
            <button
              className="w-full py-6 flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-[#2D2B29]">
                {faq.question}
              </span>
              <span className="text-[#2D2B29] ml-4">
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </span>
            </button>
            
            {openIndex === index && (
              <div className="pb-6">
                <p className="text-[#2D2B29] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}