<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $workspace_id
 * @property string $name
 * @property string|null $description
 * @property string $status
 * @property string|null $ai_provider
 * @property string|null $ai_model
 * @property string|null $idea
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'workspace_id',
        'name',
        'description',
        'status',
        'ai_provider',
        'ai_model',
        'idea',
    ];

    protected function casts(): array
    {
        return [
            'idea' => 'encrypted',
        ];
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function interviews(): HasMany
    {
        return $this->hasMany(Interview::class);
    }

    public function latestInterview(): HasOne
    {
        return $this->hasOne(Interview::class)->latestOfMany();
    }

    public function prds(): HasMany
    {
        return $this->hasMany(Prd::class);
    }

    public function latestPrd(): HasOne
    {
        return $this->hasOne(Prd::class)->latestOfMany();
    }

    public function aiMemories(): HasMany
    {
        return $this->hasMany(AiMemory::class);
    }

    public function exports(): HasMany
    {
        return $this->hasMany(Export::class);
    }

    public function generations(): HasMany
    {
        return $this->hasMany(Generation::class);
    }

    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isInterviewing(): bool
    {
        return $this->status === 'interviewing';
    }

    public function isGenerated(): bool
    {
        return $this->status === 'generated';
    }
}
