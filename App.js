import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const questions = [
  { id: 1, category: 'Qalb', text: 'Apakah Anda merasa tenang dan damai secara batin akhir-akhir ini?' },
  { id: 2, category: 'Aql', text: 'Apakah Anda mampu berpikir jernih dan mengambil keputusan secara objektif?' },
  { id: 3, category: 'Nafs', text: 'Apakah Anda sering merasa dikendalikan oleh keinginan atau emosi sesaat?' },
  { id: 4, category: 'Qalb', text: 'Apakah Anda merasakan kehadiran makna yang mendalam dalam rutinitas harian?' },
  { id: 5, category: 'Aql', text: 'Apakah pikiran Anda sering terjebak dalam keraguan atau overthinking?' },
  { id: 6, category: 'Nafs', text: 'Apakah Anda mampu mengerem diri saat ego Anda mulai mendominasi?' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ Qalb: 0, Aql: 0, Nafs: 0 });

  const handleAnswer = (value) => {
    const currentQuestion = questions[currentQuestionIndex];
    setScores(prev => ({
      ...prev,
      [currentQuestion.category]: prev[currentQuestion.category] + value
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep(2);
    }
  };

  const getResonanceResult = () => {
    const { Qalb, Aql, Nafs } = scores;
    if (Qalb >= 6 && Aql >= 6 && Nafs <= 4) {
      return { status: 'SELARAS', desc: 'Batin Anda berada dalam harmoni yang tenang. Qalb membimbing, Aql menerangi, dan Nafs tunduk teratur.', color: '#4CAF50' };
    } else if (Nafs >= 6 && Qalb <= 4) {
      return { status: 'CHAOS', desc: 'Ada pergolakan besar. Ego (Nafs) sedang mendominasi dan menekan ketenangan hati Anda.', color: '#F44336' };
    } else if (Aql >= 6 && Qalb <= 4) {
      return { status: 'NOISE', desc: 'Pikiran terlalu bising. Overthinking (Aql) membuat Anda kehilangan kepekaan rasa di dalam Qalb.', color: '#FF9800' };
    } else {
      return { status: 'VOID', desc: 'Kondisi hampa atau datar. Energi spiritual Anda sedang membutuhkan re-charge dan refleksi mendalam.', color: '#9E9E9E' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 0 && (
        <View style={styles.centerBox}>
          <Text style={styles.title}>RESONA.</Text>
          <Text style={styles.subtitle}>Spiritual Screening App</Text>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(1)}>
            <Text style={styles.buttonText}>Mulai Skrining Batin</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 1 && (
        <View style={styles.quizBox}>
          <Text style={styles.progress}>Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</Text>
          <Text style={styles.categoryBadge}>Aspek: {questions[currentQuestionIndex].category}</Text>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].text}</Text>
          
          <View style={styles.optionsContainer}>
            {[
              { label: 'Sangat Tidak Sesuai', val: 1 },
              { label: 'Tidak Sesuai', val: 2 },
              { label: 'Sesuai', val: 3 },
              { label: 'Sangat Sesuai', val: 4 }
            ].map((opt, idx) => (
              <TouchableOpacity key={idx} style={styles.optionButton} onPress={() => handleAnswer(opt.val)}>
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {currentStep === 2 && (
        <ScrollView contentContainerStyle={styles.centerBox}>
          <Text style={styles.resultTitle}>Hasil Analisis Batin</Text>
          
          <View style={[styles.statusCard, { borderColor: getResonanceResult().color }]}>
            <Text style={[styles.statusText, { color: getResonanceResult().color }]}>
              STATUS: {getResonanceResult().status}
            </Text>
            <Text style={styles.descText}>{getResonanceResult().desc}</Text>
          </View>

          <View style={styles.scoreBoard}>
            <Text style={styles.scoreText}>Skor Qalb (Hati): {scores.Qalb}</Text>
            <Text style={styles.scoreText}>Skor Aql (Akal): {scores.Aql}</Text>
            <Text style={styles.scoreText}>Skor Nafs (Ego): {scores.Nafs}</Text>
          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={() => {
            setCurrentStep(0);
            setCurrentQuestionIndex(0);
            setScores({ Qalb: 0, Aql: 0, Nafs: 0 });
          }}>
            <Text style={styles.buttonText}>Ulangi Skrining</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: '#121212' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 42, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 4 },
  subtitle: { fontSize: 16, color: '#888888', marginBottom: 40, fontStyle: 'italic' },
  button: { backgroundColor: '#6200EE', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  quizBox: { flex: 1, justifyContent: 'center', padding: 30 },
  progress: { color: '#666', fontSize: 14, marginBottom: 10 },
  categoryBadge: { color: '#6200EE', fontWeight: 'bold', fontSize: 14, marginBottom: 20, letterSpacing: 1 },
  questionText: { color: '#FFF', fontSize: 22, fontWeight: '600', marginBottom: 40, lineHeight: 32 },
  optionsContainer: { width: '100%' },
  optionButton: { backgroundColor: '#1E1E1E', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  optionText: { color: '#FFF', fontSize: 16, textAlign: 'center' },
  resultTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },
  statusCard: { width: '100%', padding: 25, borderRadius: 15, backgroundColor: '#1E1E1E', borderWidth: 2, alignItems: 'center', marginBottom: 20 },
  statusText: { fontSize: 28, fontWeight: '900', marginBottom: 15, letterSpacing: 2 },
  descText: { color: '#DDD', fontSize: 16, textAlign: 'center', lineHeight: 24 },
  scoreBoard: { width: '100%', padding: 15, backgroundColor: '#1A1A1A', borderRadius: 10 },
  scoreText: { color: '#AAA', fontSize: 15, marginVertical: 4, textAlign: 'center' }
};
