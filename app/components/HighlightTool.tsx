'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { TranscriptData, fetchMockData } from '@/app/lib/data';
import { Toast } from '@/app/lib/toastManager';

import {
  TranscriptContext,
  TranscriptContextType,
} from '@/app/contexts/TranscriptContext';
import { PlayerContext, PlayerContextType } from '@/app/contexts/PlayerContext';

import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import UploadScreen from './UploadScreen';
import ProcessingScreen from './ProcessingScreen';
import Header from './Header';
import Workspace from './Workspace';
import { INITIAL_SELECTED_IDS } from '../lib/constans';

type AppState = 'waitingForUpload' | 'processing' | 'ready';

// 初始狀態常量

export default function HighlightTool() {
  // --- 應用程式核心狀態 ---
  const [appState, setAppState] = useState<AppState>('waitingForUpload');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptData | null>(null);

  // --- UI 互動與播放器狀態 ---
  const [selectedIds, setSelectedIds] =
    useState<string[]>(INITIAL_SELECTED_IDS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentClipIndex, setCurrentClipIndex] = useState<number | null>(null);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);

  // --- Refs ---
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // --- 衍伸狀態 (Derived State) ---
  const sortedSegments = useMemo(() => {
    if (!transcript || duration === 0) return [];
    const allSentences = transcript.sections.flatMap(
      (section) => section.sentences
    );
    const selectedSentences = allSentences
      .filter((s) => selectedIds.includes(s.id))
      .filter((s) => s.startTime < duration);
    const segments = selectedSentences.map((s) => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
    }));
    return segments.sort((a, b) => a.start - b.start);
  }, [transcript, selectedIds, duration]);

  // 使用 useMemo 來計算當前應該顯示的字幕文字
  const currentSubtitle = useMemo(() => {
    // 如果沒有活動的句子 ID，或者沒有逐字稿資料，就沒有字幕
    if (!activeSentenceId || !transcript) {
      return '';
    }

    // 遍歷所有句子，找到與 activeSentenceId 匹配的那一個
    for (const section of transcript.sections) {
      for (const sentence of section.sentences) {
        if (sentence.id === activeSentenceId) {
          return sentence.text; // 找到了！回傳它的文字
        }
      }
    }

    return ''; // 理論上不應該執行到這裡，但作為保險
  }, [activeSentenceId, transcript]);

  // --- 核心邏輯函式 ---
  const handleVideoUpload = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setAppState('processing');
    const data = await fetchMockData();
    setTranscript(data);
    setAppState('ready');
  }, []);

  const handleReset = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setAppState('waitingForUpload');
    setVideoUrl(null);
    setTranscript(null);
    setSelectedIds(INITIAL_SELECTED_IDS);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    setCurrentClipIndex(null);
  }, [videoUrl]);

  const handleSentenceSelect = useCallback((sentenceId: string) => {
    setSelectedIds((prevIds) => {
      const isSelected = prevIds.includes(sentenceId);
      if (isSelected) return prevIds.filter((id) => id !== sentenceId);
      else return [...prevIds, sentenceId];
    });
  }, []);

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      if (sortedSegments.length === 0) {
        Toast.error(
          'Please select at least one sentence to create a highlight clip.'
        );
        return;
      }
      if (currentClipIndex === null) {
        const firstClip = sortedSegments[0];
        video.currentTime = firstClip.start;
        setCurrentClipIndex(0);
      }
      video.play();
      setIsPlaying(true);
    }
  }, [isPlaying, sortedSegments, currentClipIndex]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);

    // [NEW] 在每次時間更新時，尋找當前活動的句子
    let currentSentenceId: string | null = null;

    if (isPlaying) {
      for (const segment of sortedSegments) {
        if (
          video.currentTime >= segment.start &&
          video.currentTime < segment.end
        ) {
          currentSentenceId = segment.id;
          break;
        }
      }
    }
    setActiveSentenceId(currentSentenceId);

    if (!isPlaying || currentClipIndex === null) return;

    const currentClip = sortedSegments[currentClipIndex];
    if (!currentClip) return;

    if (video.currentTime >= currentClip.end || video.ended) {
      const nextClipIndex = currentClipIndex + 1;

      if (nextClipIndex < sortedSegments.length) {
        const nextClip = sortedSegments[nextClipIndex];
        video.currentTime = nextClip.start;
        setCurrentClipIndex(nextClipIndex);
      } else {
        video.pause();
        setIsPlaying(false);
        setCurrentClipIndex(null);
        video.currentTime = sortedSegments[0]?.start ?? 0;
      }
    }
  };

  const handleSeek = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;

      // 1. 尋找點擊的時間點所在的片段
      let seekClipIndex: number | null = null;

      for (let i = 0; i < sortedSegments.length; i++) {
        const segment = sortedSegments[i];
        if (time >= segment.start && time <= segment.end) {
          seekClipIndex = i;
          break;
        }
      }

      // 2. 如果點擊的位置在某個片段內，則執行跳轉
      if (seekClipIndex !== null) {
        video.currentTime = time;
        setCurrentTime(time); // 立即更新 UI 上的時間顯示
        setCurrentClipIndex(seekClipIndex); // 更新當前播放的片段索引
      } else {
        // 如果點擊在空白區域，可以給一個提示
        Toast.error('You can only seek within the highlighted segments.');
      }
    },
    [sortedSegments]
  );

  const handleSkipBack = useCallback(() => {
    if (sortedSegments.length === 0) return;

    // 如果還沒開始播放，或者就在第一個片段，就跳到第一個片段的開頭
    if (currentClipIndex === null || currentClipIndex === 0) {
      const firstClip = sortedSegments[0];
      if (videoRef.current) videoRef.current.currentTime = firstClip.start;
      setCurrentClipIndex(0);
      return;
    }

    // 否則，跳到上一個片段的開頭
    const prevClipIndex = currentClipIndex - 1;
    const prevClip = sortedSegments[prevClipIndex];
    if (videoRef.current) videoRef.current.currentTime = prevClip.start;
    setCurrentClipIndex(prevClipIndex);
  }, [currentClipIndex, sortedSegments]);

  const handleSkipForward = useCallback(() => {
    if (sortedSegments.length === 0) return;

    // 如果還沒開始播放，跳到第一個片段的開頭
    if (currentClipIndex === null) {
      const firstClip = sortedSegments[0];
      if (videoRef.current) videoRef.current.currentTime = firstClip.start;
      setCurrentClipIndex(0);
      return;
    }

    // 如果不是最後一個片段，就跳到下一個片段
    const nextClipIndex = currentClipIndex + 1;
    if (nextClipIndex < sortedSegments.length) {
      const nextClip = sortedSegments[nextClipIndex];
      if (videoRef.current) videoRef.current.currentTime = nextClip.start;
      setCurrentClipIndex(nextClipIndex);
    } else {
      // 如果已經是最後一個片段，可以選擇跳到它的結尾或給個提示
      const lastClip = sortedSegments[currentClipIndex];
      if (videoRef.current) videoRef.current.currentTime = lastClip.end;
      if (isPlaying) handleTogglePlay(); // 如果正在播放，就順便暫停
    }
  }, [currentClipIndex, sortedSegments, isPlaying, handleTogglePlay]);

  const handleTimestampClick = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;

      // 1. 暫停影片
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      }

      // 2. 跳轉到指定時間
      video.currentTime = time;
      setCurrentTime(time); // 立即更新 UI

      // 3. (可選但推薦) 同步 currentClipIndex
      // 尋找這個時間點對應的 *已選取* 片段是哪一個
      let targetClipIndex: number | null = null;
      for (let i = 0; i < sortedSegments.length; i++) {
        const segment = sortedSegments[i];
        // 即使是片段結尾的時間，也算作該片段
        if (time >= segment.start && time <= segment.end) {
          targetClipIndex = i;
          break;
        }
      }
      setCurrentClipIndex(targetClipIndex);
    },
    [isPlaying, sortedSegments]
  );

  // --- 組合要傳遞給 Context 的值 ---
  const transcriptContextValue: TranscriptContextType = {
    transcript,
    selectedIds: new Set(selectedIds),
    activeSentenceId,
    onSentenceSelect: handleSentenceSelect,
    onTimestampClick: handleTimestampClick,
  };

  const playerContextValue: PlayerContextType = {
    videoRef,
    isPlaying,
    duration,
    currentTime,
    sortedSegments,
    subtitle: currentSubtitle,
    onLoadedMetadata: handleLoadedMetadata,
    onTimeUpdate: handleTimeUpdate,
    onTogglePlay: handleTogglePlay,
    onSeek: handleSeek,
    onSkipBack: handleSkipBack,
    onSkipForward: handleSkipForward,
  };

  // --- 條件渲染 ---
  if (appState === 'waitingForUpload')
    return <UploadScreen onVideoUpload={handleVideoUpload} />;
  if (appState === 'processing') return <ProcessingScreen />;

  return (
    <TranscriptContext value={transcriptContextValue}>
      <PlayerContext value={playerContextValue}>
        <div className='flex flex-col h-screen bg-gray-900'>
          <Header onReset={handleReset} />
          <Workspace
            editor={<EditorPanel />}
            preview={<PreviewPanel videoUrl={videoUrl} />}
          />
        </div>
      </PlayerContext>
    </TranscriptContext>
  );
}
