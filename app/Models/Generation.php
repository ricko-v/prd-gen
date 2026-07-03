<?php

namespace App\Models;

use Database\Factories\GenerationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Generation extends Model
{
    /** @use HasFactory<GenerationFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'type',
        'title',
        'markdown',
        'json_content',
        'status',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'json_content' => 'array',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isGenerating(): bool
    {
        return $this->status === 'generating';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isFailed(): bool
    {
        return $this->status === 'failed';
    }

    public static function types(): array
    {
        return [
            'user_stories' => 'User Stories',
            'acceptance_criteria' => 'Acceptance Criteria',
            'database_schema' => 'Database Schema',
            'api_spec' => 'API Specification',
            'sprint_plan' => 'Sprint Plan',
        ];
    }

    public function typeLabel(): string
    {
        return self::types()[$this->type] ?? $this->type;
    }
}
