import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, push, onValue } from "firebase/database";

const Faq = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is EcoGifts?",
      answer:
        "EcoGifts is an eco-friendly e-commerce platform offering sustainable and customizable wedding return gifts, with a focus on smart inventory and green logistics.",
    },
    {
      question: "Why should I choose EcoGifts?",
      answer:
        "We are committed to sustainability and personalization. Our platform offers:\n🌱 Eco-friendly materials – Biodegradable, plant-based, and upcycled products.\n🎨 Custom gift options – Interactive whiteboard customization for personal touches.\n📦 Smart inventory & green logistics – AI-powered stock optimization & carbon-neutral shipping.",
    },
    {
      question: "How do I personalize a gift?",
      answer:
        "Use our interactive whiteboard tool at checkout to add names, messages, or designs to your selected gift.",
    },
    {
      question: "What materials do you use?",
      answer:
        "We source only biodegradable, recycled, and sustainable materials to minimize environmental impact.",
    },
    {
      question: "How does EcoGifts ensure sustainable delivery?",
      answer:
        "We work with eco-conscious logistics partners to provide carbon-neutral shipping and use recyclable packaging for all orders.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Absolutely! Once your order is shipped, you will receive a tracking link via email.",
    },
    {
      question: "What is your return & refund policy?",
      answer:
        "We offer hassle-free returns within 14 days for damaged or incorrect items. Personalized items are non-refundable unless defective.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We offer global shipping using sustainable delivery methods.",
    },
    {
      question: "How can I contact customer support?",
      answer: "📩 Email: support@ecogifts.com",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fetch user-submitted questions from Firebase
  useEffect(() => {
    const questionsRef = ref(db, "faqQuestions");
    onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedQuestions = Object.values(data);
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          ...loadedQuestions,
        ]);
      }
    });
  }, []);

  // Handle new question submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    const questionData = { question: newQuestion, answer: "Awaiting response..." };

    // Save to Firebase
    const questionsRef = ref(db, "faqQuestions");
    push(questionsRef, questionData);

    setNewQuestion("");
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Frequently Asked Questions</h1>
      <p>Here you can find answers to the most common questions.</p>

      {questions.map((q, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <h3>{q.question}</h3>
          <p style={{ whiteSpace: "pre-line" }}>{q.answer}</p>
        </div>
      ))}

      <div style={{ marginTop: "40px", padding: "20px", borderTop: "2px solid #ddd" }}>
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>

        {submitted && <p style={{ color: "green", marginTop: "10px" }}>Question submitted! We will answer soon.</p>}
      </div>
    </div>
  );
};

export default Faq;
