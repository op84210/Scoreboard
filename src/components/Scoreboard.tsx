import { useState } from 'react'
import { type Player, type ScoreType } from '../types'
import { Container } from './Container'
import { PlayerDetail } from './PlayerDetail'

interface ScoreboardProps {
    players: Player[]
    onReset: () => void
    onAddScore: (playerId: number, points: number, scoreType: ScoreType) => void
    onUpdatePlayerName: (playerId: number, newName: string) => void
}

export function Scoreboard({ players, onReset, onAddScore, onUpdatePlayerName }: ScoreboardProps) {
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)

    const selectedPlayer = selectedPlayerId
        ? players.find((p) => p.id === selectedPlayerId) ?? null
        : null

    return (
        <Container>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">主畫面</h2>
                <button
                    onClick={onReset}
                    className="w-full rounded-lg p-4 text-white bg-gray-600"
                >
                    重設一局
                </button>
            </div>
            <ul className="space-y-2">
                {players.map((p) => {
                    const colorClass = `btn-${p.color}`
                    return (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPlayerId(p.id)}
                            className={`w-full rounded-lg p-4 ${colorClass}`}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>{p.name}</span>
                                <span className="font-bold">{p.score}</span>
                            </div>
                        </button>
                    )
                })}
            </ul>

            {/* 玩家詳細彈窗 */}
            {selectedPlayer && (
                <PlayerDetail
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayerId(null)}
                    onAddScore={onAddScore}
                    onUpdatePlayerName={onUpdatePlayerName}
                />
            )}
        </Container>
    )
}