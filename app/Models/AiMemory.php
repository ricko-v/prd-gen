<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_id
 * @property string $key
 * @property string $value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class AiMemory extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'key',
        'value',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
