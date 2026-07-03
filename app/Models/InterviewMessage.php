<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $interview_id
 * @property string $role
 * @property string $content
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class InterviewMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'interview_id',
        'role',
        'content',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function interview(): BelongsTo
    {
        return $this->belongsTo(Interview::class);
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    public function isAssistant(): bool
    {
        return $this->role === 'assistant';
    }
}
