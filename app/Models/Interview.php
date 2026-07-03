<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_id
 * @property string $status
 * @property string|null $summary
 * @property array|null $analysis
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'status',
        'summary',
        'analysis',
    ];

    protected function casts(): array
    {
        return [
            'analysis' => 'array',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(InterviewMessage::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
}
